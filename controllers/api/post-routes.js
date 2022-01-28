const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, SharedSighting } = require('../../models');
const withAuth = require('../../middleware/auth');

router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    order: [
      ['datetime', 'DESC'],
      ['sighting', 'ASC'],
    ],
    attributes: [
      'id',
      'sighting',
      'description',
      'datetime',
      'location',
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
      'datetime',
      'location',
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
      console.log("###################POSTING##############" + JSON.stringify(dbPostData));
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Post.create({
      sighting: req.body.sighting,
      description: req.body.description,
      datetime: req.body.datetime,
      location: req.body.location,
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
  if (req.session) {
    Post.sharedSighting(
      {
        ...req.body,
        user_id: req.session.user_id
      },
      {
        SharedSighting,
        Comment,
        User
      })
      .then(updatedSharedSighting => res.json(updatedSharedSighting))
      .catch(err => {
        console.log(err);
        res.status(409).json(err);
      });
  }
});

router.put('/:id', withAuth, (req, res) => {
  Post.update(
    {
      sighting: req.body.sighting,
      description: req.body.description,
      datetime: req.body.datetime,
      location: req.body.location
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
