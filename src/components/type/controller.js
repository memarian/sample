const repository = require('./repository');

async function getTypeByName(req, res, next) {
  const result = await repository.findTypes(req.params.name);
  if (!result) return res.end();
  return res.json(result[req.params.name]);
}

async function getTypes(req, res, next) {
  const result = await repository.findAll();
  return res.json(result);
}

module.exports = { getTypes, getTypeByName };
