import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { cacheProviders } from '@common/cache/cache.providers';

@Module({
  controllers: [ContactsController],
  providers: [...cacheProviders, ContactsService],
})
export class ContactsModule {}
