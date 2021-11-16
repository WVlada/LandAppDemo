import Parcel from "../../models/parcel";
import Poverilac from "../../models/poverilac";
import dbConnect from "../../utils/mongoose";

export default async function handler(req, res) {
  await dbConnect();
  const data = req.body.data;

  let rb = 0;
  let arrayOfObjects = [];
  let arrayOfPoverilac = [];
  for (let i = 0; i < data.length; i++) {
    arrayOfObjects.push({
      rb: rb,
      opstina: data[rb][3],
      ko: data[rb][4],
      potes: data[rb][5] ? data[rb][5] : "",
      broj_parcele: data[rb][6] ? String(data[rb][6]) : "",
      klasa: data[rb][7],
      povrsina: parseInt(data[rb][8]),
      vlasnistvo: data[rb][10] ? data[rb][10] : "",
      hipoteka_1: data[rb][11] ? data[rb][11] : "",
      hipoteka_2: data[rb][12] ? data[rb][12] : "",
    });
    if(!arrayOfPoverilac.includes(data[rb][11])){
      arrayOfPoverilac.push(data[rb][11])
    }
    if(!arrayOfPoverilac.includes(data[rb][12])){
      arrayOfPoverilac.push(data[rb][12]);
    }
    rb += 1;
  }
  let deletedParcels = await Parcel.deleteMany({});
  let deletedPoverilacs = await Poverilac.deleteMany({});
  let objOfPoverilac= []
  arrayOfPoverilac.map((name)=>{
    if(name != "" && name != null)
    objOfPoverilac.push({
      ime: name.trim()
    })
  })
  try {
    let createdObjects = await Parcel.insertMany(arrayOfObjects);
    let createdPoverilacs = await Poverilac.insertMany(objOfPoverilac);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ text: "Error with some excel fields" });
  }
  return res.status(200).json({ text: "Data entered" });
}
