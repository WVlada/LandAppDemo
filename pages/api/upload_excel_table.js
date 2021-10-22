import Parcel from "../../models/parcel";

export default async function handler(req, res) {
  const data = req.body.data;

  let rb = 0;
  let arrayOfObjects = [];
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
    rb += 1;
  }
  let deletedParcels = await Parcel.deleteMany({});
  try {
    let createdObjects = await Parcel.insertMany(arrayOfObjects);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ text: "Error with some excel fields" });
  }
  return res.status(200).json({ text: "Data entered" });
}
