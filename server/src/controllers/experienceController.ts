const mongoose = require("mongoose");
const { Experience } = require("../models");
import { Request, Response, NextFunction } from "express";

const getExperiences = async (
    req: Request, res: Response, next: NextFunction
): Promise<void> => {
    try {
        const experiences = await Experience.find();

        res.status(200).json(experiences);
    } catch (error) {
        res.sendStatus(404);
    }
}
const getExperience = async (
    req: Request, res: Response, next: NextFunction
): Promise<void> => {
    const { id } = req.params;
    try {
        const experience = await Experience.find(id);

        res.status(200).json(experience);
    } catch (error) {
        res.sendStatus(404);
    }
}

const createExperience = async (
    req: Request, res: Response, next: NextFunction
    ): Promise<void> => {
        const experience = req.body;
        try {
            await Experience.create(experience);
            res.sendStatus(201);
        } catch (error) {
            res.sendStatus(409);
        }
    }
    
const updateExperience = async (
    req: Request, res: Response, next: NextFunction
): Promise<void | Response>  => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    };
    const experience = req.body;
    const updatedExperience = {...experience, _id: id};
    await Experience.findByIdAndUpdate(id, updatedExperience, { new: true });
    res.json(updatedExperience);
}
const deleteExperience = async (
    req: Request, res: Response, next: NextFunction
): Promise<void | Response>  => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    };
    await Experience.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
}
module.exports = {
    createExperience: createExperience,
    getExperiences: getExperiences,
    getExperience: getExperience,
    updateExperience: updateExperience,
    deleteExperience: deleteExperience,
};