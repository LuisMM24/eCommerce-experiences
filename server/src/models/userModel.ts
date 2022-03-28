import mongoose, { Document, Schema } from "mongoose";
// bcrypt
const bcrypt = require("bcrypt");
const saltRounds: Number = 10;

const validator = require("validator");

// interfaces
interface IUser extends Document {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  profileImage: String;
  role: String;
  validatePassword(password: string): boolean;
}

interface Props {
  value: String;
}

const UserSchema = new Schema<IUser>({
  _id: String,
  firstName: {
    type: String,
    require: [true, "first name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    require: [true, "last name is required"],
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    require: [true, "email is required"],
    unique: true,
    trim: true,
    validate: {
      validator: (value: String) => validator.isEmail(value),
      message: (props: Props) => `The email ${props.value} is not valid`,
    },
  },
  profileImage: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "employee", "client"],
    require: [true, "role is required"],
  },
});

UserSchema.pre("save", async function (next: Function) {
  const thisObj = this as IUser;
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model<IUser>("users", UserSchema);

module.exports = UserModel;
