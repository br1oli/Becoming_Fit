const { response, request } = require("express");
const { Product, FavoritesProduct } = require("../db");


const postFavorites = async (req = request, res = response) => {
  try {
    let { idProduct } = req.query;

    const [addProductFavorite, createdAddProductFavorite] = await FavoritesProduct.findOrCreate({
      include: { model: Product },
      where: {
        productId: idProduct,
      }
    });

    if (!idProduct)return res.send({ message: "Incorrect data" });
      res.status(200).send(addProductFavorite)
  
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const getFavorites = async (req = request, res = response) => {
    try {
      const favorites = await FavoritesProduct.findAll({ include: Product });
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