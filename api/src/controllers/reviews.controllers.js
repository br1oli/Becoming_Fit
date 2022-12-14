const { response, request } = require("express");
const { Product, Review, User, Op } = require("../db");

const getReviews = async (req = request, res = response) => {
    try {
        const Reviews = await Review.findAll({ include: [{
            model: Product,
            attributes: ["id", "name", "rating"]
        }, {
            model: User,
            attributes: ["email", "adminPermissions"]
        }]});
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
        let { idUser, rating, comment, recommend, title, quality } = req.body;
        //if ( !idProduct || !rating || !comment || !recommend || !sentence || !quality ) return res.send({ message: "Incorrect data" });
        
        const findProduct = await Product.findByPk(idProduct);
        const findUser = await User.findByPk(idUser);
    
            let [addProductReview, created] = await Review.findOrCreate({
            include: [{ model: Product }, { model: User}],
            where: {
                [Op.and]: [
                    { productId: idProduct },
                    { userEmail: findUser.dataValues.email },
                    { rating: rating },
                    { comment: comment },
                    { recommend: recommend },
                    { title: title },
                    { quality: quality },
                ],
            },
            defaults:
            {
                productId: idProduct,
                userEmail: findUser.dataValues.email,
                rating: rating, 
                comment: comment, 
                recommend: recommend, 
                title: title, 
                quality: quality
            },
            
        }); 
        
            await findProduct.addReview(addProductReview) 
            await findUser.addReview(addProductReview)  
            
            let prueba = await addProductReview;

        return res.status(200).send(prueba);
   
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteOneReview = async (req = request, res = response) => {
    try {
        let  { idReview }  = req.query;
        console.log(req.query);
        const findReviewToDelete = await Review.findByPk(idReview);
        const deleteOne = await findReviewToDelete.destroy();

        res.status(200).send("Review successfully deleted");
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
    const { idReview } = req.body;
    const { newRating, newComment, newRecommend, newTitle, newQuality } = req.body;
    try {        
        const targetReview = await Review.findByPk(idReview);
        const updateReview = await targetReview.update({ rating: newRating, 
            comment: newComment, 
            recommend: newRecommend, 
            title: newTitle, 
            quality: newQuality
        })
        await updateReview.save();  
        res.send("Review successfully updated");
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
