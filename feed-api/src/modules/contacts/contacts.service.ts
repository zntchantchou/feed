import { shortenEmail } from '@common/utils/utils';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import ContactRequest from 'db/models/ContactRequest';
import { RedisClientType } from 'redis';
import { Op } from 'sequelize';

@Injectable()
export class ContactsService {
  constructor(
    @Inject('redis-client')
    private readonly redisClient: RedisClientType,
    @InjectModel(ContactRequest) private readonly contactRequestModel,
  ) {}
  async search(input: string, limit = 100) {
    try {
      return await this.redisClient.ft.search(
        `idx:u`,
        `@shortEmail:*${shortenEmail(input)}*`,
        {
          LIMIT: { from: 0, size: limit },
        },
      );
    } catch (err) {
      console.log('[searchUsers] err', err);
    }
  }

  async getUserContacts(userId: string) {
    // Find all accepted contact requests
    const contactRequests = await this.contactRequestModel.findAll({
      where: {
        [Op.and]: [
          { status: { [Op.like]: 'ACCEPTED' } },
          { [Op.or]: [{ receiverId: userId }, { senderId: userId }] },
        ],
      },
    });

    const requests = contactRequests.map(({ receiverId, senderId }) => {
      // get whoever is not the user in the contact request
      const contactId = userId === receiverId ? senderId : receiverId;
      return this.redisClient.json.get('u:' + contactId);
    });
    // fetch user from redis
    const contacts = await Promise.all(requests);
    console.log('contacts ------ \n', contacts);
    if (!contacts) return [];
    return contacts;
  }

  /**
   *
   * @param senderId
   * @param email
   * Get user from redis.
   * If user is found, creates a contact request using senderId and found users' id
   */

  async createContactRequest(senderId: string, email: string) {
    const cacheResult = await this.getRedisUserByEmail(email);
    const user =
      cacheResult.documents.length > 0 ? cacheResult.documents[0] : null;
    if (!user) return null;
    const contactRequest = await this.contactRequestModel.create({
      senderId,
      receiverId: user.value.uid,
    });
    console.log('createContactRequest user', user.value.uid);
    console.log('createContactRequest senderId', senderId);
    console.log(
      'createContactRequest CONTACT REQUEST ===== \n',
      contactRequest,
    );
    return contactRequest;
  }

  /**
   *
   * @param email
   * @returns removes non-alphanumeric characters from the email and then performs search in cache
   */
  async getRedisUserByEmail(email: string) {
    return this.redisClient.ft.search(
      `idx:u`,
      `@shortEmail:*${shortenEmail(email)}*`,
      {
        LIMIT: { from: 0, size: 1 },
      },
    );
  }
}
