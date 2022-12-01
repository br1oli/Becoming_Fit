// const { response, request } = require("express");
// const { Product, ProductCategory, Op } = require("../db");

// const getType = async (req = request, res = response) => {
//     try {
//         const Types = await ProductCategory.findAll({ include: [{
//             model: Product,
//             attributes: ["id", "name", "rating"]
//         },
//         //  {
//         //     model: User,
//         //     attributes: ["email", "adminPermissions"]
//         // }
//       ]});
//         if(!Types.length){
//             return res.status(404).send("No types added yet")
//         }
//         res.status(200).send(Types);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
//   };


  
//   const createType = async (req = request, res = response) => {
//     try {
//         let { idProduct } = req.body;
//         let { name } = req.query; 
//         //let { idUser, rating, comment, recommend, title, quality } = req.body;
//         //if ( !idProduct || !rating || !comment || !recommend || !sentence || !quality ) return res.send({ message: "Incorrect data" });
        
//         const findProduct = await Product.findByPk(idProduct);
    
//             let [addProductType, created] = await ProductCategory.findOrCreate({
//             include: [{ model: Product }],
//             where: {
//                 [Op.and]: [
//                     { name: name }
//                 ],
//             },
//             defaults:
//             {
//               productCategoryName: name
//             },
            
//         }); 
        
//             await findProduct.addProductCategory(addProductType) 
            
//             let prueba = await addProductType;

//         return res.status(200).send(prueba);
   
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };

// const deleteType = async (req = request, res = response) => {
//     try {
//         let  { idReview }  = req.query;
//         console.log(req.query);
//         const findReviewToDelete = await Review.findByPk(idReview);
//         const deleteOne = await findReviewToDelete.destroy();

//         res.status(200).send("Review successfully deleted");
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };  


// const putReview = async (req = request, res = response) => {
//     const { idReview } = req.body;
//     const { newRating, newComment, newRecommend, newTitle, newQuality } = req.body;
//     try {        
//         const targetReview = await Review.findByPk(idReview);
//         const updateReview = await targetReview.update({ rating: newRating, 
//             comment: newComment, 
//             recommend: newRecommend, 
//             title: newTitle, 
//             quality: newQuality
//         })
//         await updateReview.save();  
//         res.send("Review successfully updated");
//     } catch (error) {
//         res.json( error.message );
//     }
// };
  
// module.exports = { 
//     getType, 
//     createType, 
//     deleteType 
// };























// const { response, request } = require("express");
// const { ProductCategory } = require("../db");
// const { typeExists } = require("../helpers/typeExist");

// const getType = async (req = request, res = response) => {
//   try {
//     const type = await ProductCategory.findAll();
//     console.log("TYPE",ProductCategory);
//     res.status(200).send(type);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// const createType = async (req = request, res = response) => {
//   const { name } = req.query;

//   if (!name) return res.status(404).send("Missing name for a new type");

//   try {
//     const type = await ProductCategory.findAll();
//     //const findType = await type.findByPk(name);

//     // const isType = typeExists(
//     //   type.map(({ name }) => name),
//     //   name
//     // );

//     //if (created === false) return res.status(202).send(newType);

//     //const newType = await ProductCategory.create({ name });
//     const [ newType, created ] = ProductCategory.findOrCreate({
//       where: {name: name},
//       defaults: {
//         name: name
//       }
//     })

//     //if (created === false) return res.status(202).send(newType);

//     res.status(200).send(newType.dataValues.name);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// const deleteType = async (req = request, res = response) => {
//   const { name } = req.query;
//   if (!name) {
//     return res.status(404).send("Name is needed to remove type");
//   }
//   try {

//     const findTypeToDelete = await ProductCategory.findByPk(name);
//     const deleteType = await findTypeToDelete.destroy({
//       where: {
//         name,
//       },
//     });
//     res.status(200).send(findTypeToDelete.dataValues);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// module.exports = { 
//     getType, 
//     createType, 
//     deleteType 
// };