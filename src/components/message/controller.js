const repository = require('./repository');

async function getMessages(req, res, next) {
  const messages = await repository.findMessages(req.user.id);
  if (!messages) return res.end();
  res.json(messages);
}

module.exports = { getMessages };
