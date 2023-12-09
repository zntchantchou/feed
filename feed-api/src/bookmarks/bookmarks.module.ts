import { BookmarksController } from './bookmarks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookmarkService } from './bookmarks.service';
import { ArticlesService } from 'src/articles/articles/articles.service';
import { Module } from '@nestjs/common';
import Article from 'db/models/Article';
import Bookmark from 'db/models/Bookmark';

@Module({
  imports: [SequelizeModule.forFeature([Article, Bookmark])],
  providers: [BookmarkService, ArticlesService],
  controllers: [BookmarksController],
})
export class BookmarksModule {}
