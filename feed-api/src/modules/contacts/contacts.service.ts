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
    console.log('getUserContactRequests');
    const contactRequests = await this.contactRequestModel.findAll({
      where: {
        [Op.and]: [
          { status: { [Op.like]: 'ACCEPTED' } },
          { [Op.or]: [{ receiverId: userId }, { senderId: userId }] },
        ],
      },
    });
    if (!contactRequests) return [];
    return contactRequests;
  }

  /**
   *
   * @param senderId
   * @param email
   * Get user from redis.
   * If user is found, creates a contact request using senderId and found users' id
   */

  async createContactRequest(senderId: string, email: string) {
    console.log('createContactRequest');
    const user = await this.getRedisUserByEmail(email);
    return user;
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
