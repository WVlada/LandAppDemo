import mongoose from "mongoose";
var Schema = mongoose.Schema;

var parcel = new Schema({
  rb: {
    type: Number,
    required: false,
  },
  opstina: {
    type: String,
    required: true,
  },
  ko: {
    type: String,
    required: true,
    default: "",
  },
  potes: {
    type: String,
    required: false,
    default: "",
  },
  broj_parcele: {
    type: String,
    required: false,
    default: "",
  },
  klasa: {
    type: String,
    required: false,
    default: "",
  },
  povrsina: {
    type: Number,
    required: true,
  },
  vlasnistvo: {
    type: String,
    required: true,
    default: "",
  },
  hipoteka_1: {
    type: String,
    required: false,
    default: "",
  },
  hipoteka_2: {
    type: String,
    required: false,
    default: "",
  },
});

mongoose.models = {};

var Parcel = mongoose.model("Parcel", parcel);

export default Parcel;
