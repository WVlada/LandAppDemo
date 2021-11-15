import mongoose from "mongoose";
var Schema = mongoose.Schema;

var session = new Schema({
  user: { type: String, default: "User" },
  time_started: { type: Date, default: Date.now },
});

mongoose.models = {};

var Session = mongoose.model("Session", session);

export default Session;
