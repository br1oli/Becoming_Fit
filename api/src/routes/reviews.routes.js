const { Router } = require("express");
const { getReviews, postReview, deleteOneReview, putReview, deleteAllReviews } = require("../controllers");
const router = Router();

router.post("/reviews", postReview)
router.get("/reviews", getReviews)
router.delete("/reviews", deleteOneReview)
router.delete("/reviewsAll", deleteAllReviews)
router.put("/reviews", putReview)

module.exports = router;