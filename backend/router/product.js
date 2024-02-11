const express = require("express")
const router = express.Router()
const auth = require("../middlewares/auth")
const isAdmin = require("../middlewares/isAdmin")
const productController = require("../controllers/product")


router.get("/", productController.getProducts)
router.get("/:id", productController.getProductsById)
router.post("/create", auth, isAdmin, productController.postProduct)
router.post("/edit/:id", auth, isAdmin, productController.updateProduct)
router.delete("/:id", auth, isAdmin, productController.deleteProduct)


module.exports = router