import { Module } from '@nestjs/common';
import { BookmarksController } from './bookmarks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Article from 'db/models/Article';
import { BookmarkService } from './bookmarks.service';
import { ArticlesService } from 'src/articles/articles/articles.service';

@Module({
  imports: [SequelizeModule.forFeature([Article])],
  providers: [BookmarkService, ArticlesService],
  controllers: [BookmarksController],
})
export class BookmarksModule {}
