import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";

// interfaces
interface IUser extends Document {
  firstName: String;
  lastName: String;
  email: String;
  profileImage: String;
  role: String;
}

interface Props {
  value: String;
}

const UserSchema = new Schema<IUser>({
  _id: String,
  firstName: {
    type: String,
    required: [true, "first name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    trim: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: (props: Props) => `The email ${props.value} is not valid`,
    },
  },
  profileImage: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "employee", "client"],
    required: true,
  },
});

const UserModel = mongoose.model<IUser>("user", UserSchema);

module.exports = UserModel;
