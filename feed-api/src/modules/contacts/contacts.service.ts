import { shortenEmail } from '@common/utils/utils';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RedisClientType } from 'redis';
import { Op } from 'sequelize';
import ContactRequest from 'db/models/ContactRequest';

@Injectable()
export class ContactsService {
  constructor(
    @Inject('redis-client')
    private readonly redisClient: RedisClientType,
    @InjectModel(ContactRequest) private readonly contactRequestModel,
  ) {}
  async search(input: string, limit = 100) {
    return await this.redisClient.ft.search(
      `idx:u`,
      `@shortEmail:*${shortenEmail(input)}*`,
      {
        LIMIT: { from: 0, size: limit },
      },
    );
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
    const user = await this.getRedisUserByEmail(email);
    if (!user) return null;
    return this.contactRequestModel.create({
      senderId,
      receiverId: user.value.uid,
    });
  }

  /**
   *
   * @param email
   * @returns removes non-alphanumeric characters from the email and then performs search in cache
   */
  async getRedisUserByEmail(email: string) {
    const result = await this.redisClient.ft.search(
      `idx:u`,
      `@shortEmail:*${shortenEmail(email)}*`,
      {
        LIMIT: { from: 0, size: 1 },
      },
    );
    if (result.documents && result.documents.length > 0) {
      return result.documents[0];
    }
    return null;
  }
}
