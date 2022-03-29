import express from "express";
const { createExperience, getExperiences, getExperience, updateExperience, deleteExperience } = require("../controllers/experienceController");
const authMiddleware = require("../middleware/auth-middleware");
const router = express.Router();
// get all experiences
router.get("/", getExperiences);
// get experience by id
router.get("/:id", getExperience);
// auth middleware
router.use("/", authMiddleware);
// create new experience
router.post("/", createExperience);
// update experience
router.patch("/:id", updateExperience);
// delete experience
router.delete("/:id", deleteExperience);

module.exports = router;
