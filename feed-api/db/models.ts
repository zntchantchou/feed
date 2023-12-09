import Article from './models/Article';
import Bookmark from './models/Bookmark';

const models = {
  Article,
  Bookmark,
};

// create tables if necessary
Object.values(models).forEach(async (model) => model.sync());

export default models;
