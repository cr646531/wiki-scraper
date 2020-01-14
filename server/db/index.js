const conn = require('./conn');
const User = require('./User');
const Link = require('./Link');

const syncAndSeed = ()=> {
  return conn.sync({ force: true })
    .then(()=> {
      return Promise.all([
        User.create({ name: 'moe', password: 'MOE' }),
        User.create({ name: 'larry', password: 'LARRY' }),
        User.create({ name: 'curly', password: 'CURLY' }),
      ]);
    });
};

module.exports = {
  models: {
    User,
    Link
  },
  syncAndSeed
};
