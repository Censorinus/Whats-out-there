const router = require('express').Router();
const sequelize = require('../../config/connection');
const fs = require('fs').promises;
const parse = require('csv-parse/lib/sync');
const dtl = require('dtl-js');
const { User, Post, Comment, SharedSighting } = require('../../models');
const withAuth = require('../../middleware/auth');


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

const bulkLoad = async function (username) {
  const fileContent = await fs.readFile(__dirname + '/../../public/input/sightings.csv');
  const records = parse(fileContent, { columns: true });

  let transform = {
    "out": {
      "sighting": "(: &( $shape ' - ' $duration ) :)",
      "datetime": "(: &( $occurrence_date ' @ ' $time ) :)",
      "location": "(: &( $city ',' $state ) :)",
      "description": "(: &( $summary ) :)",
      "user_id": 1
    }
  };

  let newSightings = [];
  for (let i = 0; i < records.length; i++) {
    let sighting = records[i];
    let dmy = sighting.occurrence_date.split('/');
    if (dmy && dmy.length === 3) {
      let century = dmy[2] > 40 ? '19' : '20';
      let dateStr = (century + dmy[2].trim()) + '-'
        + ('0' + dmy[0].trim()).slice(-2) + '-'
        + ('0' + dmy[1].trim()).slice(-2);
      sighting.occurrence_date = dateStr;
    }
    let newSighting = dtl.apply_transform(sighting, transform);
    newSightings.push(newSighting);
  }
  await Post.bulkCreate(newSightings);

};

router.post('/login', (req, res) => {
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

      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });

      if (dbUserData.username === 'anonymous') {
        await bulkLoad(dbUserData.username);
      }
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
