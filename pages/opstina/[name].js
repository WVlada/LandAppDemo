import LeftButtons from "../../components/index/buttons_component";
import TableComponent from "../../components/index/table.component";
import { useState, useEffect } from "react";
import Parcel from "../../models/parcel";
import dbConnect from "../../utils/mongoose";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import Link from "next/link";
import { formatNumber, makeOpstineFromFirme } from "../../utils/utils";
import Map from "../../components/index/map_component";

export default function Firma({ opstina, parcelsJSON, hipoteke, opstine }) {
  const parcels = JSON.parse(parcelsJSON);

  return (
    <div className="flex flex-col flex-1">
      {<Map opstine={opstine} />}
      <Table
        className="text-xs md:text-lg"
        variant="striped"
        colorScheme="gray"
        mt={[2, 10]}
      >
        <TableCaption placement="top">
          Pregled zemljišta u opštini {opstina}
        </TableCaption>
        <Thead>
          <Tr>
            <Th textAlign="center" p={[1, 5]}>
              Vlasnik
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              Površina
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              Hipoteka
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              Slobodno
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {parcels.map((parcel, index) => {
            return (
              <Tr className="cursor-pointer" key={index}>
                <Td p={[1, 5]}>{parcel.opstina}</Td>
                <Td textAlign="right" p={[1, 5]}>
                  {formatNumber(parcel.povrsina)}
                </Td>
                <Td p={[1, 5]} isNumeric>
                  {formatNumber(parcel.povrsina)}
                </Td>
                <Td p={[1, 5]} isNumeric>
                  {formatNumber(parcel.povrsina)}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th textAlign="center" p={[1, 5]}>
              <p className="lowercase font-extrabold text-xs md:text-lg">
                {formatNumber(0)}
              </p>
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              <p className="lowercase font-extrabold text-xs md:text-lg">
                {formatNumber(0)}
              </p>
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              <p className="lowercase font-extrabold text-xs md:text-lg">
                {formatNumber(0)}
              </p>
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              <p className="lowercase font-extrabold text-xs md:text-lg">
                {formatNumber(0)}
              </p>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </div>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();

  const { name } = context.params;
  const parcels = await Parcel.aggregate([
    { $match: { opstina: name } },
    { $group: { _id: "$vlasnistvo", sum: { $sum: "$povrsina" } } },
    { $sort: { _id: -1 } },
  ]);
  const parcelsKO = await Parcel.aggregate([
    { $match: { opstina: name } },
    { $sort: { broj_parcele: -1 } },
  ]);
  const ko = {};
  parcelsKO.map((red) => {
    if (ko[red.vlasnistvo]) {
      if (ko[red.vlasnistvo][red.ko]) {
        ko[red.vlasnistvo][red.ko].push(red);
      } else {
        ko[red.vlasnistvo][red.ko] = [red];
      }
    } else {
      ko[red.vlasnistvo] = {}
    }
  });
  console.log("ko", ko);
  //let vlasnistvoSum = await Parcel.aggregate([
  //  { $group: { _id: "$vlasnistvo", sum: { $sum: "$povrsina" } } },
  //  { $sort: { _id: -1 } },
  //]);
  const firme = {};
  //vlasnistvoSum.map((e) => {
  //  firme[e._id] = { active: false };
  //});
  parcels.map((e) => {
    firme[e._id] = { active: true };
  });
  //console.log("parcels", parcels);
  //const sum = parcels.reduce(function (a, b) {
  //  return a + b.povrsina;
  //}, 0);
  //firme[`${name}`] = {
  //  active: true,
  ////  sum: sum,
  //};
  console.log("firme:", firme);
  const hip = await Parcel.aggregate([
    { $match: { opstina: name } },
    { $sort: { _id: -1 } },
  ]).group({
    _id: {
      hipoteka_1: "$hipoteka_1",
      hipoteka_2: "$hipoteka_2",
      vlasnistvo: "$vlasnistvo",
    },
    sum: { $sum: "$povrsina" },
  });
  //console.log("hip:", hip);
  let hipoteke = {};
  hip.map((red) => {
    if (red._id.hipoteka_1 || red._id.hipoteka_2) {
      if (hipoteke[red._id.vlasnistvo]) {
        hipoteke[red._id.vlasnistvo] += red.sum;
      } else {
        hipoteke[red._id.vlasnistvo] = red.sum;
      }
    } else {
    }
  });
  console.log("hipteke", hipoteke);
  let opstinePocetno = await Parcel.aggregate([
    { $match: { opstina: name } },
    {
      $group: {
        _id: { opstina: "$opstina", vlasnistvo: "$vlasnistvo" },
        sum: { $sum: "$povrsina" },
      },
    },
  ]);
  const opstineSrednjeno = makeOpstineFromFirme(firme, opstinePocetno);
  return {
    props: {
      opstina: name,
      parcelsJSON: JSON.stringify(parcels),
      hipoteke: hipoteke,
      opstine: opstineSrednjeno,
    },
  };
}
