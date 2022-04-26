const redis = require('redis');
const redisClient = redis.createClient();

module.exports = () => {
  redisClient.on('connect', () => {
    console.log('client redis connected');
  });

  redisClient.on('error', (err) => {
    console.log(err);
  });
};
