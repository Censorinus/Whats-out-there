const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
 

class Post extends Model {
  static sharedSighting(body, models) {
    return models.SharedSighting.create({
      user_id: body.user_id,
      post_id: body.post_id
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
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
            model: models.Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: models.User,
              attributes: ['username']
            }
          }
        ]
      });
    });
  }
}


Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sighting: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    datetime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);


module.exports = Post;
