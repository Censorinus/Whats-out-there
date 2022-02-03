const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [
  {username: 'user1', password: 'user1'},
  {username: 'user2', password: 'user2'},
  {username: 'user3', password: 'user3'},
  {username: 'user4', password: 'user4'},
  {username: 'user5', password: 'user5'},
  {username: 'user6', password: 'user6'},
  {username: 'user7', password: 'user7'},
  {username: 'user8', password: 'user8'},
  {username: 'user9', password: 'user9'},
  {username: 'user10', password: 'user10'},
  {username: 'user11', password: 'user11'},
  {username: 'user12', password: 'user12'},
  {username: 'user13', password: 'user13'},
  {username: 'user14', password: 'user14'},
  {username: 'user15', password: 'user15'},
  {username: 'user16', password: 'user16'},
  {username: 'user17', password: 'user17'},
  {username: 'user18', password: 'user18'},
  {username: 'user19', password: 'user19'},
  {username: 'user20', password: 'user20'},
  {username: 'user21', password: 'user21'},
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
