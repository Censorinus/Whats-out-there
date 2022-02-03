const { Comment } = require('../models');

const commentdata = [
  {comment_text: 'This is comment #1', user_id: 1, post_id: 1},
  {comment_text: 'This is comment #2', user_id: 2, post_id: 2},
  {comment_text: 'This is comment #3', user_id: 3, post_id: 3},
  {comment_text: 'This is comment #4', user_id: 4, post_id: 4},
  {comment_text: 'This is comment #5', user_id: 5, post_id: 5},
  {comment_text: 'This is comment #6', user_id: 6, post_id: 6},
  {comment_text: 'This is comment #7', user_id: 7, post_id: 7},
  {comment_text: 'This is comment #8', user_id: 8, post_id: 8},
  {comment_text: 'This is comment #9', user_id: 9, post_id: 9},
  {comment_text: 'This is comment #10', user_id: 10, post_id: 10},
  {comment_text: 'This is comment #11', user_id: 11, post_id: 11},
  {comment_text: 'This is comment #12', user_id: 12, post_id: 12},
  {comment_text: 'This is comment #13', user_id: 13, post_id: 13},
  {comment_text: 'This is comment #14', user_id: 14, post_id: 14},
  {comment_text: 'This is comment #15', user_id: 15, post_id: 15},
  {comment_text: 'This is comment #16', user_id: 16, post_id: 16},
  {comment_text: 'This is comment #17', user_id: 17, post_id: 17},
  {comment_text: 'This is comment #18', user_id: 18, post_id: 18},
  {comment_text: 'This is comment #19', user_id: 19, post_id: 19},
  {comment_text: 'This is comment #20', user_id: 20, post_id: 20},
  
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
