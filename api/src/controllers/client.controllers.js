const { response, request } = require('express');

const getClients = (req = request, res = response) => {
  try {
    res.json('test');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClients,
};
