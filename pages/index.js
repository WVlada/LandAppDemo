import Map from "../components/index/map_component";
import LeftButtons from "../components/index/buttons_component";
import TableComponent from "../components/index/table.component";
import FileUploadForm from "../components/index/upload_file";
import { useState, useEffect } from "react";
import Parcel from "../models/parcel";
import dbConnect from "../utils/mongoose";

export default function Index({ vlasnistvoSum, opstineSrednjeno }) {
  const [data, setData] = useState(vlasnistvoSum);
  const [opstine, setOpstine] = useState(opstineSrednjeno);
  const handleCheckClick = (e) => {
    let newData = [...data];
    for (let i = 0; i < newData.length; i++) {
      if (newData[i]._id == e) {
        newData[i]["selected"] = !newData[i]["selected"];
      }
    }
    setData(newData);
  };
  // update opstine hash on every data change
  useEffect(() => {
    let newOpstine = { ...opstine };
    let array = Object.keys(newOpstine);
    data.map((firma) => {
      console.log(firma._id, "je: ", firma.selected);
      if (!firma.selected) {
        // svuda gde je ta firma, trebam da oduzmem sve sta ima za to firmu na tom mestu
        array.map((opstina) => {
          if (newOpstine[opstina].vlasnici[firma._id]) {
            newOpstine[opstina].sum -= newOpstine[opstina].vlasnici[firma._id];
            delete newOpstine[opstina].vlasnici[firma._id];
          }
        });
      }
    });
    setOpstine(newOpstine);
  }, [data]);
  console.log(opstine);
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-row flex-1">
        <LeftButtons data={data} handleCheckClick={handleCheckClick} />
        <Map opstine={opstine} />
      </div>

      <div className="flex flex-col flex-1">
        <FileUploadForm />
        <TableComponent data={data} />
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  await dbConnect();
  const parcels = await Parcel.find({});
  let vlasnistvoSum = await Parcel.aggregate([
    { $group: { _id: "$vlasnistvo", sum: { $sum: "$povrsina" } } },
  ]);
  let opstinaSum = await Parcel.aggregate([
    {
      $group: {
        _id: { opstina: "$opstina", vlasnistvo: "$vlasnistvo" },
        sum: { $sum: "$povrsina" },
      },
    },
  ]);
  let opstineSrednjeno = {};
  opstinaSum.map((o) => {
    if (opstineSrednjeno[o._id["opstina"]]) {
      if (opstineSrednjeno[o._id["opstina"]]["vlasnici"][o._id.vlasnistvo]) {
        opstineSrednjeno[o._id["opstina"]].sum += o.sum;
        opstineSrednjeno[o._id["opstina"]]["vlasnici"][o._id.vlasnistvo] +=
          o.sum;
      } else {
        opstineSrednjeno[o._id["opstina"]]["vlasnici"][o._id.vlasnistvo] =
          o.sum;
        opstineSrednjeno[o._id["opstina"]].sum += o.sum;
      }
    } else {
      opstineSrednjeno[o._id["opstina"]] = {
        sum: o.sum,
        vlasnici: { [`${o._id.vlasnistvo}`]: o.sum },
      };
    }
  });
  vlasnistvoSum.map((e) => (e.selected = true));
  console.log("Vlsnisto sum:", vlasnistvoSum);
  //console.log(opstinaSum);

  //let zbir = 0
  //let array = Object.keys(opstineSrednjeno)
  //array.map((a)=>{
  //  zbir += opstineSrednjeno[a].sum
  //})
  //console.log('Zbir:', zbir);
  //console.log('array:', array);
  console.log("Opstine sredjeno:", opstineSrednjeno);
  return {
    props: {
      vlasnistvoSum: vlasnistvoSum,
      opstineSrednjeno: opstineSrednjeno,
    },
  };
}
