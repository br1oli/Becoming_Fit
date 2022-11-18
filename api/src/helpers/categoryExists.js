const categoryExists = (categories, name) => {
  if (!categories.length) return false;

  const category = categories.find(
    (category) => category.toLowerCase() === name.toLowerCase()
  );

  return category ? true : false;
};

module.exports = { categoryExists };
