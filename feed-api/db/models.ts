import connection from './connection';
import Bookmark from './models/Bookmark';

const models = {
  Bookmark,
};

// create tables if necessary
Object.values(models).forEach(async (model) => model.sync());

export default models;
