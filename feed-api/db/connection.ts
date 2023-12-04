import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  port: 8002,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USER,
  dialect: 'postgres',
});

export default sequelize;
