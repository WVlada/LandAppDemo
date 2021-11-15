import mongoose from "mongoose";
var Schema = mongoose.Schema;

var sesion = new Schema({
  user: { type: String, default: "User" },
  time_started: { type: Date, default: Date.now },
});

mongoose.models = {};

var Sesion = mongoose.model("Sesion", sesion);

export default Sesion;
