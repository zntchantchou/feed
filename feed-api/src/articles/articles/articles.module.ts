import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import models from 'db/models';

@Module({
  providers: [ArticlesService],
  imports: [SequelizeModule.forFeature([...Object.values(models)])],
})
export class ArticlesModule {}
