const router = require('express').Router();
const { Recipes } = require('../../models');

router.get('/', async (req, res) => {
    try {
    const recipesData = await Recipes.findAll({    
    });
    res.status(200).json(recipesData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newRecipe = await Recipes.create(req.body);
        res.status(200).json(newRecipe);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleteRecipe = await Recipes.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!deleteRecipe) {
            res.status(404).json({ message: 'No recipe found with this id! '});
            return;
        }

        res.status(200).json(deleteRecipe);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;