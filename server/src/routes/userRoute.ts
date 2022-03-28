import express from "express";
const router = express.Router();
// get all users
router.get("/");
// get user by id
router.get("/:id");
// login user
router.post("/login");
// sign up new user
router.post("/sign-up");
// update user
router.patch("/:id");
// delete user
router.delete("/:id");

export default router;
