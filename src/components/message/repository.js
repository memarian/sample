const model = require('./model');

async function findMessages(userId, ln = true) {
  return await model.findById(userId).lean(ln);
}

module.exports = {
  findMessages,
};
