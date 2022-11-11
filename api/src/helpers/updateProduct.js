const { Product } = require("../db");

const updateProductInDb = async (
  id,
  name,
  type,
  color,
  gender,
  size,
  rating,
  price,
  description,
  image
) => {
  try {
    let product = await Product.findByPk(id);

    if (product === null) {
      throw new Error("The product you trying to update does not exists");
    }

    await product.update({
      name: name ? name : product.name,
      type: type ? type : product.type,
      color: color ? color : product.type,
      gender: gender ? gender : product.gender,
      size: size ? size : product.size,
      rating: rating ? rating : product.rating,
      price: price ? price : product.price,
      description: description ? description : product.description,
      image: image ? image : product.image,
    });
    await product.save();

    return "Se actualizo correctamente.";
  } catch (error) {
    return error;
  }
};
module.exports = { updateProductInDb };
