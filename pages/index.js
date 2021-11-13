import Map from "../components/index/map_component";
import LeftButtons from "../components/index/buttons_component";
import TableComponent from "../components/index/table.component";
import TabelaKlasa from "../components/index/tabela_klasa.component";
import FileUploadForm from "../components/index/upload_file";
import { useState, useEffect } from "react";
import Parcel from "../models/parcel";
import dbConnect from "../utils/mongoose";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useSession, getSession, signIn, signOut } from "next-auth/client";
import LoginScreen from "../components/index/login";

export default function Index({
  opstineSrednjeno,
  data,
  firmeArray,
  opstinePocetno,
  hipotekePocetno,
}) {
  const [firme, setFirme] = useState(data);
  const [opstine, setOpstine] = useState(opstineSrednjeno);
  const [hipoteke, setHipoteke] = useState(
    makeHipotekeFromFirme(firme, hipotekePocetno)
  );

  const handleCheckClick = (e) => {
    let newFirme = { ...firme };
    newFirme[e]["active"] = !newFirme[e].active;
    setFirme(newFirme);
  };
  useEffect(() => {
    let newOpstine = makeOpstineFromFirme(firme, opstinePocetno);
    let newHipoteke = makeHipotekeFromFirme(firme, hipotekePocetno);
    setOpstine(newOpstine);
    setHipoteke(newHipoteke);
  }, [firme, opstinePocetno, hipotekePocetno]);
  //console.log("Opstine:", opstine);
  //console.log("Hipoteke:", hipoteke);
  const [session, loading] = useSession();
  console.log("sess:", session);
  const handleLogout = () => {
    signOut();
  };
  if (!session) {
    return <LoginScreen></LoginScreen>;
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-row flex-1">
        <LeftButtons
          handleCheckClick={handleCheckClick}
          firme={firme}
          firmeArray={firmeArray}
        />
        <Map opstine={opstine} />
      </div>

      <div className="flex flex-col flex-1">
        {session ? <FileUploadForm /> : null}
        <TableComponent
          hipoteke={hipoteke}
          firme={firme}
          firmeArray={firmeArray}
        />
      </div>
      <div className="flex flex-1 justify-center">
        <Link href="/klase" className="" w={50} passHref>
          <Button
            mt={10}
            mb={10}
            bgColor={"#94b8bb"}
            className="rounded-sm text-white bg-green-basic font-oswald"
          >
            Tabela klasa
          </Button>
        </Link>
      </div>
      <div className="flex flex-1 justify-end">
        <a
          onClick={handleLogout}
          className="rounded-sm m-3 text-green-basic font-oswald cursor-pointer"
        >
          logout
        </a>
      </div>
    </div>
  );
}

const makeHipotekeFromFirme = (firme, hipotekePocetno) => {
  const hipoteke = {};
  hipotekePocetno.map((red) => {
    if (red._id.hipoteka_1 != "" || red._id.hipoteka_2 != "") {
      if (hipoteke[red._id.vlasnistvo]) {
        hipoteke[red._id.vlasnistvo] += red.sum;
      } else {
        if (firme[red._id.vlasnistvo]["active"]) {
          hipoteke[red._id.vlasnistvo] = red.sum;
        }
      }
    }
  });
  return hipoteke;
};
const makeOpstineFromFirme = (firme, opstine) => {
  //console.log(opstine)
  // opstine: [
  //  { _id: { opstina: 'Sečanj', vlasnistvo: 'Đ.N.' }, sum: 116094 },
  //  { _id: { opstina: 'Sečanj', vlasnistvo: 'Ribnjak Sutjeska' },
  //  sum: 9202252
  //} Vlsnisto sum: [
  // { _id: 'Đ.N.', sum: 975848, selected: true },
  // { _id: 'Greenco Eko Park', sum: 902694, selected: true },
  let firmeArray = Object.keys(firme);
  let opstineSrednjeno = {};
  opstine.map((o, index) => {
    if (firme[o._id["vlasnistvo"]]["active"]) {
      if (opstineSrednjeno[o._id["opstina"]]) {
        if (opstineSrednjeno[o._id["opstina"]]["vlasnici"][o._id]) {
          opstineSrednjeno[o._id["opstina"]].sum += o.sum;
          opstineSrednjeno[o._id["opstina"]]["vlasnici"][o._id.vlasnistvo] +=
            o.sum;
          //opstineSrednjeno[o._id["opstina"]].hipoteka += o.hipoteka_1 ? o.hipoteka_1 : 0  + o.hipoteka_2 ? o.hipoteka_2 : 0;
        } else {
          opstineSrednjeno[o._id["opstina"]]["vlasnici"][o._id.vlasnistvo] =
            o.sum;
          opstineSrednjeno[o._id["opstina"]].sum += o.sum;
          //opstineSrednjeno[o._id["opstina"]].hipoteka += o.hipoteka_1 ? o.hipoteka_1 : 0  + o.hipoteka_2 ? o.hipoteka_2 : 0;
        }
      } else {
        opstineSrednjeno[o._id["opstina"]] = {
          sum: o.sum,
          vlasnici: { [`${o._id.vlasnistvo}`]: o.sum },
          //hipoteka: (o.hipoteka_1 || o.hipoteka_2) ? o. o.hipoteka_1 : 0  + o.hipoteka_2 ? o.hipoteka_2 : 0 ,
        };
      }
    } else {
    }
  });
  //console.log(opstineSrednjeno)
  return opstineSrednjeno;
};

export async function getStaticProps(context) {
  await dbConnect();
  let vlasnistvoSum = await Parcel.aggregate([
    { $group: { _id: "$vlasnistvo", sum: { $sum: "$povrsina" } } },
    { $sort: { _id: -1 } },
  ]);
  let firme = {};
  let firmeArray = [];
  vlasnistvoSum.map((e) => {
    firme[e._id] = { active: true };
    firme[e._id]["sum"] = e.sum;
    firmeArray.push(e._id);
  });
  let opstinePocetno = await Parcel.aggregate([
    {
      $group: {
        _id: { opstina: "$opstina", vlasnistvo: "$vlasnistvo" },
        sum: { $sum: "$povrsina" },
      },
    },
  ]);
  let hipotekePocetno = await Parcel.aggregate([
    {
      $group: {
        _id: {
          vlasnistvo: "$vlasnistvo",
          hipoteka_1: "$hipoteka_1",
          hipoteka_2: "$hipoteka_2",
        },
        sum: { $sum: "$povrsina" },
      },
    },
  ]);
  //const hipoteke = {};
  //hipotekePocetno.map((red) => {
  //  if (red._id.hipoteka_1 != "" || red._id.hipoteka_2 != "") {
  //    if (hipoteke[red._id.vlasnistvo]) hipoteke[red._id.vlasnistvo] += red.sum;
  //    else {
  //      hipoteke[red._id.vlasnistvo] = red.sum;
  //    }
  //  }
  //});
  const opstineSrednjeno = makeOpstineFromFirme(firme, opstinePocetno);
  //const hipotekeSrednjeno = makeHipotekeFromFirme(firme, hipotekePocetno);

  return {
    props: {
      vlasnistvoSum: vlasnistvoSum,
      opstineSrednjeno: opstineSrednjeno,
      firmeArray: firmeArray,
      data: firme,
      opstinePocetno: opstinePocetno,
      hipotekePocetno: hipotekePocetno,
    },
  };
}
