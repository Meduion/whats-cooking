const User = require('./User');
const Recipes = require('./Recipes');
const UserRecipes = require('./UserRecipes');

User.belongsToMany(Recipes, { through: UserRecipes });
Recipes.belongsToMany(User, { through: UserRecipes });

module.exports = { User, Recipes, UserRecipes };