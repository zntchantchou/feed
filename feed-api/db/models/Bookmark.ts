import { DataTypes } from 'sequelize';
import {
  Model,
  Column,
  Table,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Article from './Article';

@Table
export class Bookmark extends Model {
  @AllowNull(false)
  @ForeignKey(() => Article)
  @Column
  articleId: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  userId: string;

  @BelongsTo(() => Article)
  article: Article;
}

export default Bookmark;
