const mongoose = require('mongoose');

module.exports = async () => {
  const DBHOST = process.env.DB_HOST;
  const DBPORT = process.env.DB_PORT;
  const DBNAME = process.env.DB_NAME;

  mongoose.connect(
    `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: true,
    },
    (err) => {
      if (err) console.log(err);
      else console.log(`connected to database ${process.env.DB_NAME}`);
    }
  );

  process.on('SIGINT', () => {
    mongoose.connection.close((err) => {
      process.exit(err ? 1 : 0);
    });
  });
};
