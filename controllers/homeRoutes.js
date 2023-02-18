const router = require('express').Router();
const { User, Recipes } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  
  res.render('homepage', {
    logged_in: req.session.logged_in
  });
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/profile', (req, res) => {
  User.findByPk(req.session.user_id, { raw: true })
    .then(user => {
      Recipes.findAll({ raw: true})
        .then(recipes => {
          console.log(user);
          // console.log(req.session);
          // console.log(recipes);
          res.render('profile', { user, recipes });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
