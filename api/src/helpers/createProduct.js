const { Product, Category, Brand } = require("../db");

const createProductInDb = async (
  name,
  type,
  color,
  gender,
  size,
  rating,
  price,
  brandName,
  categoryName,
  description,
  image
) => {
  try {
    const [instanceCategory, createdCategory] = await Category.findOrCreate({
      where: {
        name: categoryName,
      },
      defaults: {
        name: categoryName,
      },
    });

    const [instaceBrand, createdBrand] = await Brand.findOrCreate({
      where: {
        name: brandName,
      },
      defaults: {
        name: brandName,
      },
    });

    const [product, createdProduct] = await Product.findOrCreate({
      where: {
        name: name,
      },
      include: {
        model: Category,
      },
      defaults: {
        name,
        type,
        color,
        gender,
        size,
        rating,
        price,
        brandName,
        categoryName,
        description,
        image,
      },
    });

    if (createdBrand || !!instaceBrand) {
      await instaceBrand.addProduct(product);
    }
    if (createdCategory || !!instanceCategory) {
      await instanceCategory.addProduct(product);
    }

    return product;
  } catch (error) {
    return error;
  }
};
module.exports = { createProductInDb };
