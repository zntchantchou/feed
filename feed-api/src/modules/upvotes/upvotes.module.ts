import { Module } from '@nestjs/common';
import { UpvotesService } from './upvotes.service';
import { UpvotesController } from './upvotes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Upvote from 'db/models/Upvote';
import Article from 'db/models/Article';
import { ArticlesService } from '@modules/articles/articles.service';

@Module({
  imports: [SequelizeModule.forFeature([Article, Upvote])],
  controllers: [UpvotesController],
  providers: [UpvotesService, ArticlesService],
})
export class UpvotesModule {}
