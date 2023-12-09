import { DataTypes } from 'sequelize';
import {
  Model,
  Column,
  Table,
  AllowNull,
  BeforeValidate,
} from 'sequelize-typescript';

@Table
export class Article extends Model {
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
    unique: true,
  })
  uid: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  title: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  description: string;

  @Column({
    type: DataTypes.STRING,
  })
  urlToImage: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  url: string;

  @Column({
    type: DataTypes.STRING,
  })
  source: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  publishedAt: string;

  @Column({
    type: DataTypes.STRING,
  })
  content: string;

  @BeforeValidate
  static setUid(article: Article) {
    const date = new Date(article.publishedAt)
      .toISOString()
      .replace(/[^a-zA-Z0-9]/g, '');
    const title = article.title.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '');
    article.uid = date + title;
  }
}

export default Article;
