import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookmarksModule } from 'src/modules/bookmarks/bookmarks.module';
import { ConfigModule } from '@nestjs/config';
import { TokenMiddleware } from './common/middleware/token/token.middleware';
import { BookmarksController } from 'src/modules/bookmarks/bookmarks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Article from 'db/models/Article';
import Bookmark from 'db/models/Bookmark';

@Module({
  imports: [
    BookmarksModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      port: 8002,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER,
      dialect: 'postgres',
      models: [Article, Bookmark],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      // all routes are authenticated
      .forRoutes(AppController, BookmarksController);
  }
}
