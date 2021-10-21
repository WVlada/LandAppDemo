import Map from "../components/index/map_component";
import LeftButtons from "../components/index/buttons_component";
import { PrismaClient } from "@prisma/client";
import TableComponent from "../components/index/table.component";
import FileUploadForm from "../components/index/upload_file";
import { useState, useEffect } from "react";

export default function Index({ sumOfParcels, selected }) {
  const [data, setData] = useState(sumOfParcels);
  const handleCheckClick = (e) => {
    let newData = [...data];
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].vlasnistvo == e) {
        console.log(e);
        newData[i]["selected"] = !newData[i]["selected"];
      }
    }
    setData(newData);
  };
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-row flex-1">
        <LeftButtons data={data} handleCheckClick={handleCheckClick} />
        <Map />
      </div>

      <div className="flex flex-col flex-1">
        <FileUploadForm />
        <TableComponent data={data} />
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const prisma = new PrismaClient();
  const allParcels = await prisma.parcel.findMany();
  const sumOfParcels = await prisma.parcel.groupBy({
    by: ["vlasnistvo"],
    _sum: {
      povrsina: true,
    },
  });
  sumOfParcels.map((e) => (e.selected = true));
  console.log(sumOfParcels);
  return {
    props: {
      sumOfParcels: sumOfParcels,
    }, // will be passed to the page component as props
  };
}
