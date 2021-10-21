import mongoose from "mongoose";
var Schema = mongoose.Schema;

var user = new Schema({
  name: {
    type: String,
    required: false,
    default: "",
  },
});

mongoose.models = {};

var User = mongoose.model("User", user);

export default User;
