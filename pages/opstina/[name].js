import Map from "../../components/index/map_component";
import LeftButtons from "../../components/index/buttons_component";
import TableComponent from "../../components/index/table.component";
import { useState, useEffect } from "react";
import Parcel from "../../models/parcel";
import dbConnect from "../../utils/mongoose";

export default function Opstina({}) {
  return <div className=""></div>;
}

export async function getServerSideProps(context) {
  await dbConnect();
  
  const { name } = context.params.name;
  const parcels = await Parcel.find({vlasnik: name});
  return {
    props: {opstina: name},
  };
}
