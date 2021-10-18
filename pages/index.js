import Map from "../components/index/map_component";
import LeftButtons from "../components/index/buttons_component";
import { PrismaClient } from "@prisma/client";
import TableComponent from "../components/index/table.component";
import FileUploadForm from "../components/index/upload_file";

export default function Index({ sumOfParcels }) {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-row flex-1">
        <LeftButtons />
        <Map />
        <LeftButtons />
      </div>

      <div className="flex flex-col flex-1">
        <FileUploadForm />
        <TableComponent data={sumOfParcels} />
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
  console.log(sumOfParcels)
  return {
    props: {
      sumOfParcels: sumOfParcels,
    }, // will be passed to the page component as props
  };
}
