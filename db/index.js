const conn = require('./conn');
const User = require('./User');

const syncAndSeed = ()=> {
  return conn.sync({ force: true })
    .then(()=> {
      return Promise.all([
        User.create({ name: 'moe' }),
        User.create({ name: 'larry' }),
        User.create({ name: 'curly' }),
      ]);
    });
};

module.exports = {
  models: {
    User
  },
  syncAndSeed
};
