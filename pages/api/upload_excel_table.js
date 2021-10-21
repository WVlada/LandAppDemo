import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const data = req.body.data;
  const rowCount = data.length;
  
  const prisma = new PrismaClient();
  let deletedParcels = await prisma.parcel.deleteMany({});
  try {
    let rb = 0;
    for (let i = 0; i < rowCount; i++) {
      let parcel = await prisma.parcel.create({
        data: {
          rb: rb,
          ko: data[rb][4],
          potes: data[rb][5] ? data[rb][5] : "",
          number: data[rb][6] ? String(data[rb][6]) : "",
          klasa: data[rb][7],
          povrsina: parseInt(data[rb][8]),
          vlasnistvo: data[rb][10] ? data[rb][10] : "",
        },
      });
      rb += 1;
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ text: "Error with some excel fields" });
  }

  return res.status(200).json({ text: "Data entered" });
}
