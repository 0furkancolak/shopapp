const express = require("express")
const router = express.Router()
const userController = require("../controllers/user")
const auth = require("../middlewares/auth")
const isAdmin = require("../middlewares/isAdmin")

router.get("/", auth, isAdmin, userController.getUsers)
router.post("/login", userController.login)
router.post("/register", userController.register)
router.delete("/delete/:id", auth, isAdmin, userController.deleteUser)


module.exports = router