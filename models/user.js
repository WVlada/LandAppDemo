import mongoose from "mongoose";
var Schema = mongoose.Schema;

var user = new Schema({
  name: {
    type: String,
    required: true,
    default: "",
  },
  admin: {
    type: String,
    required: true,
    default: false,
  },
});

mongoose.models = {};

var User = mongoose.model("User", user);

export default User;
