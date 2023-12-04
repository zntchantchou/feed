import { DataType, DataTypes } from 'sequelize';
import db from '../connection';

const Bookmark = db.define('Bookmark', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urlToImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  source: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  publishedAt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Bookmark.sync();

export default Bookmark;
