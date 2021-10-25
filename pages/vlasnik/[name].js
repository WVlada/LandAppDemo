import Map from "../../components/index/map_component";
import LeftButtons from "../../components/index/buttons_component";
import TableComponent from "../../components/index/table.component";
import { useState, useEffect } from "react";
import Parcel from "../../models/parcel";
import dbConnect from "../../utils/mongoose";

export default function Firma({vlasnik}) {
  return <div className="">{vlasnik}</div>;
}

export async function getServerSideProps(context) {
  await dbConnect();
  
  const { name } = context.params;
  return {
    props: {
      vlasnik: name
    },
  };
}
