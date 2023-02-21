const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipesRoutes = require('./recipesRoutes');
const userRecipesRoutes = require('./userRecipesRoutes');

router.use('/users', userRoutes);
router.use('/recipes', recipesRoutes);
router.use('/userrecipes', userRecipesRoutes);

module.exports = router;