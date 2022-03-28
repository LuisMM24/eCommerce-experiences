import { ConnectOptions } from "mongodb";
import mongoose from "mongoose";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
function connection() {
  mongoose
    .connect(
      "mongodb+srv://experiences-team:QjFIvStc2cM31qgm@cluster0.7qazo.mongodb.net/experiencesDB?retryWrites=true&w=majority",
      options as ConnectOptions
    )
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = connection;
