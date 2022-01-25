const { Post } = require('../models');

const postdata = [
  {
    sighting: 'Donec posuere metus vitae ipsum.',
    description: 'Content - Donec posuere metus vitae ipsum.',
    user_id: 10
  },
  {
    sighting: 'Morbi non quam nec dui luctus rutrum.',
    description: 'Content - Morbi non quam nec dui luctus rutrum.',
    user_id: 8
  },
  {
    sighting: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    description: 'Content - Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    user_id: 1
  },
  {
    sighting: 'Nunc purus.',
    description: 'Content - Nunc purus.',
    user_id: 4
  },
  {
    sighting: 'Pellentesque eget nunc.',
    description: 'Content - Pellentesque eget nunc.',
    user_id: 7
  },
  {
    sighting: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    description: 'Content - Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    user_id: 4
  },
  {
    sighting: 'In hac habitasse platea dictumst.',
    description: 'Content - In hac habitasse platea dictumst.',
    user_id: 1
  },
  {
    sighting: 'Morbi non quam nec dui luctus rutrum.',
    description: 'Content - Morbi non quam nec dui luctus rutrum.',
    user_id: 1
  },
  {
    sighting: 'Duis ac nibh.',
    description: 'Content - Duis ac nibh.',
    user_id: 9
  },
  {
    sighting: 'Curabitur at ipsum ac tellus semper interdum.',
    description: 'Content - Curabitur at ipsum ac tellus semper interdum.',
    user_id: 5
  },
  {
    sighting: 'In hac habitasse platea dictumst.',
    description: 'Content - In hac habitasse platea dictumst.',
    user_id: 3
  },
  {
    sighting: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',
    description: 'Content - Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',
    user_id: 10
  },
  {
    sighting: 'Donec dapibus.',
    description: 'Content - Donec dapibus.',
    user_id: 8
  },
  {
    sighting: 'Nulla tellus.',
    description: 'Content - Nulla tellus.',
    user_id: 3
  },
  {
    sighting: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
    description: 'Content - Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
    user_id: 3
  },
  {
    sighting:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.',
    description:
      'Content - Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.',
    user_id: 7
  },
  {
    sighting: 'In hac habitasse platea dictumst.',
    description: 'Content - In hac habitasse platea dictumst.',
    user_id: 6
  },
  {
    sighting: 'Etiam justo.',
    description: 'Content - Etiam justo.',
    user_id: 4
  },
  {
    sighting: 'Nulla ut erat id mauris vulputate elementum.',
    description: 'Content - Nulla ut erat id mauris vulputate elementum.',
    user_id: 6
  },
  {
    sighting: 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    description: 'Content - Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    user_id: 7
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
