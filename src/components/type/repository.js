const model = require('./model');

async function findTypes(name, ln = true) {
  return await model.findOne().select(`${name}`).lean(ln);
}

async function findAll() {
  return await model.find({}, '-_id').lean();
}

async function getTypes() {
  const result = await model.findOne({}, '-_id').lean();
  return result;
}

async function create(data) {
  return await model.create(data);
}


async function update(params) {}

module.exports = { findAll, findTypes, getTypes, create };
