import mongoose, { Schema, Document } from "mongoose";

interface IExperience extends Document {
  title: String;
  description: string;
  location: string;
  group: string;
  level: string;
  dates: string;
  price: Number;
  availableSlots: Number;
  bookedSlots: Number;
  photos: [String];
}

const ExperienceSchema = new Schema<IExperience>({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  location: {
    type: String,
    required: [true, "location is required"],
  },
  group: {
    type: String,
    required: [true, "group is required"],
  },
  level: {
    type: String,
    required: [true, "level is required"],
  },
  dates: {
    type: String,
    required: [true, "dates are required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  availableSlots: {
    type: Number,
    required: [true, "available slots are required"],
  },
  bookedSlots: {
    type: Number,
    required: [true, "booked slots are required"],
  },
  photos: {
    type: [String],
    required: [true, "at least, 1 photo is required"],
  },
});

const ExperienceModel = mongoose.model<IExperience>(
  "experience",
  ExperienceSchema
);

export default ExperienceModel;
