import express from "express";
const { signUp, updateUser } = require("../controllers/userController");

const router = express.Router();
// get all users
// router.get("/");
// get user by id
// router.get("/:id");
// login user
// router.post("/login");
// sign up new user
router.post("/sign-up", signUp);
// update user
router.patch("/:id", updateUser);
// delete user
// router.delete("/:id");

module.exports = router;
