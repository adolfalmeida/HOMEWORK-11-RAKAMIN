const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user_controller.js");
const auth = require("../middlewares/auth.js");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/get", auth, UserController.get);
router.get("/get/:id", UserController.getById);
router.delete("/:id", UserController.delete);
router.patch("/:id", UserController.update);


module.exports = router;
