const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment, SharedSighting } = require('../../models');
const withAuth = require('../../middleware/auth');
const fs = require('fs').promises;
const parse = require('csv-parse/lib/sync');

// get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'sighting', 'description', 'created_at']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['sighting']
        }
      },
      {
        model: Post,
        attributes: ['sighting'],
        through: SharedSighting,
        as: 'shared-sighting'
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // expects {username: 'Lernantino', password: 'password1234'}
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(async dbUserData => {
      if (dbUserData) {
        res.status(409).json({ message: 'User already exists!' });
        return;
      }
      await User.create({
        username: req.body.username,
        password: req.body.password
      })
        .then(dbUserData => {
          req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        })
    })
});

router.post('/login', (req, res) => {
  // expects {username: 'lernantino', password: 'password1234'}
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(async dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that username!' });
        return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }

      if (req.body.username === 'anonymous') {
        const fileContent = await fs.readFile(__dirname + '/input/sightings.csv');
        const records = parse(fileContent, { columns: true });
        res.json(records);
        // move the input file to the archive folder.
      }

      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:id', withAuth, (req, res) => {
  // expects {username: 'Lernantino', password: 'password1234'}
  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
