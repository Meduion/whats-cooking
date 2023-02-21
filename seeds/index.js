const sequelize = require('../config/connection');
const { Recipes } = require('../models');
const recipesSeeds = require('./recipesSeeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Recipes.bulkCreate(recipesSeeds);

  console.log('Database Seeded!');

  process.exit(0);
};

seedDatabase();