import express from "express";
const {
  signUp,
  updateUser,
  getUsers,
  getUserById,
  deleteUser,
  loginUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/auth-middleware");
const router = express.Router();
// auth middleware
router.use("/", authMiddleware);
// get all users
router.get("/", getUsers);
// get user by id
router.get("/:id", getUserById);
// login user
router.post("/login", loginUser);
// sign up new user
router.post("/sign-up", signUp);
// update user
router.patch("/:id", updateUser);
// delete user
router.delete("/:id", deleteUser);

module.exports = router;
