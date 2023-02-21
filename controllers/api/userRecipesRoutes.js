const router = require('express').Router();
const { Recipes, User, UserRecipes } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const userRecipesData = await UserRecipes.findAll({
    });
    res.status(200).json(userRecipesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newUserRecipe = await UserRecipes.create(req.body);
    res.status(200).json(newUserRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;