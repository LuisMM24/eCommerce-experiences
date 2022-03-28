import express from "express";
const router = express.Router();
// get all experiences
router.get("/");
// get experience by id
router.get("/:id");
// create new experience
router.post("/");
// update experience
router.patch("/:id");
// delete experience
router.delete("/:id");

module.exports = router;
