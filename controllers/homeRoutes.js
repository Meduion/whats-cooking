const router = require("express").Router();
const { User, Recipes } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  res.render("homepage", {
    logged_in: req.session.logged_in,
  });
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

router.get("/profile", withAuth, (req, res) => {
  User.findByPk(req.session.user_id, { raw: true })
    .then((user) => {
      Recipes.findAll({ raw: true })
        .then((recipes) => {
          res.render("profile", { user, recipes });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

router.get("/profile/:id", withAuth, async (req, res) => {
  try {
    const recipe = await Recipes.findByPk(req.params.id);
    const userData = await User.findByPk(req.session.user_id);

    const data = recipe.get({ plain: true });
    const user = userData.get({ plain: true });
    console.log(data);
    console.log(user);
    res.render("profile", { data, user });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
