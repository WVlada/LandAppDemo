import Map from "../components/index/map_component";
import LeftButtons from "../components/index/buttons_component";
import { PrismaClient } from "@prisma/client";


export default function Index({ sumOfParcels }) {
  return (
    <div className="grid grid-cols-10">
      <div className="">
        <LeftButtons />
      </div>
      <div className="col-span-8">
        <Map />
      </div>
      <div>{sumOfParcels.map((s, index)=>{
        return <p key={index}>{s._sum.povrsina}</p>
      })}</div>
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
  return {
    props: {
      sumOfParcels: sumOfParcels,
    }, // will be passed to the page component as props
  };
}
