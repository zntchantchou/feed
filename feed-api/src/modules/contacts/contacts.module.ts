import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { cacheProviders } from '@common/cache/cache.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import ContactRequest from 'db/models/ContactRequest';

@Module({
  imports: [SequelizeModule.forFeature([ContactRequest])],
  controllers: [ContactsController],
  providers: [...cacheProviders, ContactsService],
})
export class ContactsModule {}
