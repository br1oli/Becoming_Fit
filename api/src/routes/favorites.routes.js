const { Router } = require("express");
const { getFavorites, postFavorites, deleteOneFavorites, putFavorites, deleteAllFavorites } = require("../controllers");
const router = Router();

router.post("/favorites", postFavorites)
router.get("/favorites", getFavorites)
router.delete("/favorites", deleteOneFavorites)
router.delete("/favoritesAll", deleteAllFavorites)
router.put("/platforms", putFavorites)

module.exports = router;