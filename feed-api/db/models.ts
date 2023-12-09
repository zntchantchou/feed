import Article from './models/Article';

const models = {
  Article,
};

// create tables if necessary
Object.values(models).forEach(async (model) => model.sync());

export default models;
