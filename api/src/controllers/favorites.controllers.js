const { response, request } = require("express");
const { Product, FavoritesProduct, User } = require("../db");
const { Op } = require("sequelize");


const postFavorites = async (req = request, res = response) => {
  try {
    let { idProduct } = req.query;
    let { idUser } = req.body;

    const findProduct = await Product.findByPk(idProduct);
    const findUser = await User.findByPk(idUser);

    if (!idProduct)return res.send({ message: "Incorrect data" });

    const [addProductFavorite, createdAddProductFavorite] = await FavoritesProduct.findOrCreate({
      include:  [{model: Product}, {model: User}],
      where: {
        productId: idProduct,
        userEmail: idUser,
      },
      defaults: {
        productId: idProduct,
        userEmail: findUser.dataValues.email,
      }
    });

      res.status(200).send(addProductFavorite)
  
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const getFavorites = async (req = request, res = response) => {
    try {
      const { userEmail }= req.query 
      const whereClause = userEmail ? [{userEmail: userEmail}] : null
      const favorites = await FavoritesProduct.findAll(
        { include: [Product, User], 
          where: whereClause 
        });
      if(!favorites.length){
        return res.status(404).send("No products added yet")
      }
      res.status(200).send(favorites);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };


  const deleteOneFavorites = async (req = request, res = response) => {
    try {
      let { id } = req.query;

      const findProductToDelete = await FavoritesProduct.findByPk(id);

      const deleteOne = await findProductToDelete.destroy();
  
      res.status(200).send(findProductToDelete.dataValues);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };


  const deleteAllFavorites = async (req = request, res = response) => {
    try {
        let findall = await FavoritesProduct.findAll();
      const deleteAll = findall.forEach((e) => e.destroy())
  
      res.status(200).send("All favorites deleted");
    } catch (error) {
      res.status(500).send(error.message);
    }
  };


  const putFavorites = async (req = request, res = response) => {
    try {
      let { id } = req.params;
  
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

module.exports = {
    postFavorites,
    getFavorites,
    deleteOneFavorites,
    deleteAllFavorites,
    putFavorites
};
