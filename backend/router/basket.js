const express = require("express")
const router = express.Router()
const auth = require("../middlewares/auth")
const basketController = require("../controllers/basket")


router.get("/", auth, basketController.getCartItems)
router.post("/", auth, basketController.addToCart)
router.delete("/:productId", auth, basketController.removeFromCart)


module.exports = router