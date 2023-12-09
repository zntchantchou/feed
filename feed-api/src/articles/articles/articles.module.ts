import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import Article from 'db/models/Article';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [ArticlesService],
  imports: [SequelizeModule.forFeature([Article])],
})
export class ArticlesModule {}
