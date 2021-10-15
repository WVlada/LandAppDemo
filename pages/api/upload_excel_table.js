import fs from "fs";
import path from "path";
import formidable from "formidable";
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.uploadDir = "./utils/upload/";
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    //console.log(err, fields, files);
    const ExcelJS = require("exceljs");
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(files.excel_table.path);
    const worksheet = workbook.getWorksheet("sve");
    const rowCount = worksheet.rowCount;
    console.log(rowCount);
    const prisma = new PrismaClient();
    let deletedParcels = await prisma.parcel.deleteMany({});
    try {
      let rb = 1;
      for (let i = 2; i <= rowCount; i++) {
        let n = worksheet.getRow(i).findCell(5)
          ? worksheet.getRow(i).findCell(5).text
          : "*";
        //console.log(n);
        let parcel = await prisma.parcel.create({
          data: {
            rb: rb,
            ko: worksheet.getRow(i).findCell(3).text,
            potes: worksheet.getRow(i).findCell(4)
              ? worksheet.getRow(i).findCell(4).text
              : "",
            number: worksheet.getRow(i).findCell(5)
              ? worksheet.getRow(i).findCell(5).text
              : "",
            klasa: worksheet.getRow(i).findCell(6).text,
            povrsina: parseInt(worksheet.getRow(i).findCell(7).text),
            vlasnistvo: worksheet.getRow(i).findCell(9).text,
          },
        });
        rb += 1;
      }
    } catch (err) {
      return res.status(500).json({ text: "Error with some excel fields" });
    }
  });
  // now remove all files
  const directory = "./utils/upload/";

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });

  return res.status(200).json({ text: "Database uploaded" });
}

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
