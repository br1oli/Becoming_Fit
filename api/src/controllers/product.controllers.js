const { response, request } = require('express');

const getProducts = (req = request, res = response) => {
  try {
    res.json('test');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
};
