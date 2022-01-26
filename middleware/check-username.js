const checkUsername = (req, res, next) => {
  if (!req.body.username) {
    res.redirect('/signup');
  } else {
    User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        username: req.body.username
      },
    })
    .catch(err => {
      next();
    })
    .then(() => {
        res.status(404).json({ message: 'User already exists!' });
    });
  }
};

module.exports = checkUsername;
