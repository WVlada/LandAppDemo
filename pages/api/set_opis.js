import Poverilac from "../../models/poverilac";
import dbConnect from "../../utils/mongoose";
export default async function handler(req, res) {
  const opis = req.body.textvalue;
  const ime = req.body.poverilac;
  await dbConnect();

  try {
    let parcel = await Poverilac.findOne({ ime: ime });
    await parcel.update({ opis: opis });
  } catch (err) {
    return res
      .status(500)
      .json({ text: "Error saving info. Try again later." });
  }

  return res.status(200).json({ text: "Info saved." });
}
