
export default async function handler(req, res) {
  const ExcelJS = require("exceljs");
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("./utils/zajedno.xlsx");
  //const worksheet = workbook.worksheets[0];
  const worksheet = workbook.getWorksheet("sve");
  const rowCount = worksheet.rowCount;
  //console.log(workbook.worksheets[0].getRow(1).findCell(1).text);

  //const idCol = worksheet.getColumn("A");
  console.log(rowCount);
  const prisma = new PrismaClient();
  let deletedParcels = await prisma.parcel.deleteMany({});

  try {
    let rb = 1;
    for (let i = 2; i <= rowCount; i++) {
      //console.log(worksheet.getRow(i).findCell(5).text);
      let n = worksheet.getRow(i).findCell(5)
        ? worksheet.getRow(i).findCell(5).text
        : "*";
      console.log(n);
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

  const allUsers = await prisma.user.findMany();

  return res.status(200).json({ text: "Database reseted" });
}
