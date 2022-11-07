const { response, request } = require('express');

const getClients = (req = request, res = response) => {
  try {
    res.json('test');
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  getClients,
};
