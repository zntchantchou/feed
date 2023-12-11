import { BookmarksController } from '@modules/bookmarks/bookmarks.controller';
import { BookmarkService } from '@modules/bookmarks/bookmarks.service';
import { ArticlesService } from '@modules/articles/articles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import Article from 'db/models/Article';
import Bookmark from 'db/models/Bookmark';

@Module({
  imports: [SequelizeModule.forFeature([Article, Bookmark])],
  providers: [BookmarkService, ArticlesService],
  controllers: [BookmarksController],
})
export class BookmarksModule {}
