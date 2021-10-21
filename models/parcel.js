import mongoose from "mongoose";
var Schema = mongoose.Schema;

var parcel = new Schema({
  name: {
    type: String,
    required: false,
    default: "",
  },
});

mongoose.models = {};

var Parcel = mongoose.model("Parcel", parcel);

export default Parcel;
