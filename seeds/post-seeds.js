const { Post } = require('../models');

const postdata = [
  {sighting: 'A new sighting 10', description: 'Descriptive text for sighting #10', datetime: '2021-01-10', location: 'Groveland,FL', user_id: 1},
  {sighting: 'A new sighting 11', description: 'Descriptive text for sighting #11', datetime: '2021-01-11', location: 'Groveland,FL', user_id: 2},
  {sighting: 'A new sighting 12', description: 'Descriptive text for sighting #12', datetime: '2021-01-12', location: 'Groveland,FL', user_id: 3},
  {sighting: 'A new sighting 13', description: 'Descriptive text for sighting #13', datetime: '2021-01-13', location: 'Groveland,FL', user_id: 4},
  {sighting: 'A new sighting 14', description: 'Descriptive text for sighting #14', datetime: '2021-01-14', location: 'Groveland,FL', user_id: 5},
  {sighting: 'A new sighting 15', description: 'Descriptive text for sighting #15', datetime: '2021-01-15', location: 'Groveland,FL', user_id: 6},
  {sighting: 'A new sighting 16', description: 'Descriptive text for sighting #16', datetime: '2021-01-16', location: 'Groveland,FL', user_id: 7},
  {sighting: 'A new sighting 17', description: 'Descriptive text for sighting #17', datetime: '2021-01-17', location: 'Groveland,FL', user_id: 8},
  {sighting: 'A new sighting 18', description: 'Descriptive text for sighting #18', datetime: '2021-01-18', location: 'Groveland,FL', user_id: 9},
  {sighting: 'A new sighting 19', description: 'Descriptive text for sighting #19', datetime: '2021-01-19', location: 'Groveland,FL', user_id: 10},
  {sighting: 'A new sighting 20', description: 'Descriptive text for sighting #20', datetime: '2021-01-20', location: 'Groveland,FL', user_id: 11},
  {sighting: 'A new sighting 21', description: 'Descriptive text for sighting #21', datetime: '2021-01-21', location: 'Groveland,FL', user_id: 12},
  {sighting: 'A new sighting 22', description: 'Descriptive text for sighting #22', datetime: '2021-01-22', location: 'Groveland,FL', user_id: 13},
  {sighting: 'A new sighting 23', description: 'Descriptive text for sighting #23', datetime: '2021-01-23', location: 'Groveland,FL', user_id: 14},
  {sighting: 'A new sighting 24', description: 'Descriptive text for sighting #24', datetime: '2021-01-24', location: 'Groveland,FL', user_id: 15},
  {sighting: 'A new sighting 25', description: 'Descriptive text for sighting #25', datetime: '2021-01-25', location: 'Groveland,FL', user_id: 16},
  {sighting: 'A new sighting 26', description: 'Descriptive text for sighting #26', datetime: '2021-01-26', location: 'Groveland,FL', user_id: 17},
  {sighting: 'A new sighting 27', description: 'Descriptive text for sighting #27', datetime: '2021-01-27', location: 'Groveland,FL', user_id: 18},
  {sighting: 'A new sighting 28', description: 'Descriptive text for sighting #28', datetime: '2021-01-28', location: 'Groveland,FL', user_id: 19},
  {sighting: 'A new sighting 29', description: 'Descriptive text for sighting #29', datetime: '2021-01-29', location: 'Groveland,FL', user_id: 20},
  {sighting: 'A new sighting 30', description: 'Descriptive text for sighting #30', datetime: '2021-01-30', location: 'Groveland,FL', user_id: 21},
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
