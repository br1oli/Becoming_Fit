const data = require("../data.json");

const getProductsByJson = () => {
  try {
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = { getProductsByJson };
