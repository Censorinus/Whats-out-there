const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, SharedSighting } = require('../../models');
const withAuth = require('../../middleware/auth');

// get all users
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    attributes: [
      'id',
      'sighting',
      'description',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM sharedSighting WHERE post.id = sharedSighting.post_id)'), 'sharedSighting']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'sighting',
      'description',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM sharedSighting WHERE post.id = sharedSighting.post_id)'), 'sharedSighting']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  // expects {sighting: 'Large black object at mid-day',
  //          description: 'Saw a large black object at mid-day during a walk in the park', user_id: 1}
  if (req.session) {
    Post.create({
      sighting: req.body.sighting,
      description: req.body.description,
      user_id: req.session.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

router.put('/sharedsighting', withAuth, (req, res) => {
  // custom static method created in models/Post.js
  if (req.session) {
    Post.sharedSighting({ ...req.body, user_id: req.session.user_id }, { SharedSighting, Comment, User })
      .then(updatedSharedSighting => res.json(updatedSharedSighting))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

router.put('/:id', withAuth, (req, res) => {
  Post.update(
    {
      sighting: req.body.sighting,
      description: req.body.description
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  console.log('id', req.params.id);
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
