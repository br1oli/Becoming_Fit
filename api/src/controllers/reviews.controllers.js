const { response, request } = require("express");
const { Product, Review, User } = require("../db");

const getReviews = async (req = request, res = response) => {
    try {
        const Reviews = await Review.findAll({ include: Product, User });
        if(!Reviews.length){
            return res.status(404).send("No reviews added yet")
        }
        res.status(200).send(Reviews);
    } catch (error) {
        res.status(500).send(error.message);
    }
  };

const postReview = async (req = request, res = response) => {
    try {
        let { idProduct, reviewText, rating } = req.body;  
        console.log(req.body);
        if ( !idProduct || !reviewText || !rating ) return res.send({ message: "Incorrect data" });
        const findProduct = await Product.findByPk(idProduct)
        const addProductReview = await Review.create({
            description: reviewText,
            rating: rating
        });          
        if (!addProductReview) throw new Error;
        await findProduct.addReview(addProductReview);        
        res.status(200).send(addProductReview)
    } catch (error) {
        res.status(500).send(error.message);
    }
};  

const deleteOneReview = async (req = request, res = response) => {
    try {
        let { id } = req.query;
        console.log(id)
        const findReviewToDelete = await Review.findByPk(id);
        const deleteOne = await findReviewToDelete.destroy();
        res.status(200).send(findReviewToDelete.dataValues);
    } catch (error) {
        res.status(500).send(error.message);
    }
};  
  
const deleteAllReviews = async (req = request, res = response) => {
    try {
        let findall = await Review.findAll();
        const deleteAll = findall.forEach((e) => e.destroy());
        res.status(200).send("All Reviews deleted");
    } catch (error) {
        res.status(500).send(error.message);
    }
};
  
const putReview = async (req = request, res = response) => {
    try {
        let { id } = req.params;
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
  
  module.exports = {
      postReview,
      getReviews,
      deleteOneReview,
      deleteAllReviews,
      putReview
  };