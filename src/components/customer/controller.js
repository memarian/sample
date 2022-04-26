const repository = require('./repository');
const path = require('path');

async function getCustomer(req, res, next) {
  const customer = await repository.findById(req.user.id, '-_id -contents');
  if (!customer) return res.end();
  res.json(customer);
}


async function editInfo(req, res, next) {
  if (!req.body) {
    res.status(400);
    throw Error('data required');
  }
  const result = await repository.editInfo(req.user.id, req.body);
  res.json(result);
}



async function addInfo(req, res, next) {
  if (!req.body) {
    res.status(400);
    throw Error('info required');
  }
  await repository.insertInfo(req.user.id, req.body);
  res.status(204).send();
}


module.exports = {
  getCustomer,
  editInfo,
  addInfo,
};
