import mongoose from "mongoose";
var Schema = mongoose.Schema;

var poverilac = new Schema({
  ime: { type: String, default: "" },
  opis: { type: String, default: "" },
});

mongoose.models = {};

var Poverilac = mongoose.model("Poverilac", poverilac);

export default Poverilac;
