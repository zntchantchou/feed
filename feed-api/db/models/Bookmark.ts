import { DataTypes } from 'sequelize';
import {
  Model,
  Column,
  Table,
  AllowNull,
  ForeignKey,
  BelongsTo,
  Index,
} from 'sequelize-typescript';
import Article from './Article';

@Table
export class Bookmark extends Model {
  @AllowNull(false)
  @Index({ name: 'userId-articleId', unique: true })
  @ForeignKey(() => Article)
  @Column
  articleId: string;

  @AllowNull(false)
  @Index({ name: 'userId-articleId', unique: true })
  @Column({
    type: DataTypes.STRING,
  })
  userId: string;

  @BelongsTo(() => Article)
  article: Article;
}

export default Bookmark;
