const { response, request } = require("express");
const { Product, Review, User } = require("../db");

const getReviews = async (req = request, res = response) => {
    try {
        const Reviews = await Review.findAll({ include: {
            model: Product,
            attributes: ["id", "name"]
        }});
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
        let { idProduct } = req.query; 
        console.log(idProduct)
        let { rating, comment, recommend, title, quality } = req.body;
        const findProduct = await Product.findByPk(idProduct);
        const [addProductReview, created] = await Review.findOrCreate({            
            include: { model: Product },
            where: {
                productId: idProduct,
            },
            defaults:{
                rating: rating, 
                comment: comment, 
                recommend: recommend, 
                title: title, 
                quality: quality
            }
        }); 
        if (created === false) return res.status(500).send("Already created");  
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
    const { idReview, newRating, newComment, newRecommend, newTitle, newQuality } = req.body;
    try {        
        const targetReview = await Review.findByPk(idReview); 
        const updateReview = await targetReview.update({ rating: newRating, 
            comment: newComment, 
            recommend: newRecommend, 
            title: newTitle, 
            quality: newQuality
        })
        await updateReview.save();  
        res.send("Review updated successfully");
    } catch (error) {
        res.json( error.message );
    }
};
  
  module.exports = {
      postReview,
      getReviews,
      deleteOneReview,
      deleteAllReviews,
      putReview
  };