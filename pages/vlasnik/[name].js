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
import coords from "../../utils/vojvodina_coordinates.json";

export default function Firma({ vlasnik, sum, opstine, hipoteke, hipoteke_drugog_reda }) {
  //const parcels = JSON.parse(parcelsJSON)
  console.log(vlasnik);
  //console.log( parcelsJSON);
  console.log(sum);
  console.log(opstine);
  return (
    <div className="flex flex-col flex-1">
      <Map opstine={opstine} />
      <Table
        className="text-xs md:text-lg"
        variant="simple"
        colorScheme="gray"
        mt={[2, 10]}
      >
        <TableCaption placement="top">
          Pregled svog zemljišta vlasnika: {vlasnik}
        </TableCaption>
        <Thead>
          <Tr>
            <Th textAlign="center" p={[1, 5]}>
              Opština
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
          {Object.keys(opstine).map((opstina, index) => {
            return (
              <Link key={index} href={`/vlasnik/${opstina}/${vlasnik}`}>
                <Tr
                  style={{
                    backgroundColor:
                      coords.opstine.filter((e) => e.name == opstina).length > 0
                        ? coords.opstine.filter((e) => e.name == opstina)[0]
                            .preFillColor
                        : "",
                  }}
                  className="cursor-pointer"
                  key={index}
                >
                  <Td p={[2, 5]}>{opstina}</Td>
                  <Td textAlign="right" p={[2, 5]}>
                    {formatNumber(opstine[opstina].sum)}
                  </Td>
                  <Td p={[2, 5]} isNumeric>
                    {formatNumber(opstine[opstina].sum)}
                  </Td>
                  <Td p={[2, 5]} isNumeric>
                    {formatNumber(opstine[opstina].sum)}
                  </Td>
                </Tr>
              </Link>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th textAlign="center" p={[1, 5]}>
              <p className="lowercase font-extrabold text-xs md:text-lg">
                {/*formatNumber(sum)*/}
              </p>
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              <p className="lowercase font-extrabold text-xs md:text-lg">
                {formatNumber(sum)}
              </p>
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              <p className="lowercase font-extrabold text-xs md:text-lg">
                {formatNumber(sum)}
              </p>
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              <p className="lowercase font-extrabold text-xs md:text-lg">
                {formatNumber(sum)}
              </p>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
      <div></div>
      <Table
        className="text-xs md:text-lg"
        variant="simple"
        colorScheme="gray"
        mt={[2, 10]}
      >
        <TableCaption placement="top">Pregled hipoteka</TableCaption>
        <Thead>
          <Tr>
            <Th textAlign="center" p={[1, 5]}>
              Hipoteka
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              U korist:
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              Povrsina
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              Slobodno
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(hipoteke).map((hipoteka, index) => {
            return (
              <Link key={index} href="/">
                <Tr style={{}} className="cursor-pointer" key={index}>
                  <Td p={[2, 5]}>{hipoteka}</Td>
                  <Td textAlign="right" p={[2, 5]}>
                    {formatNumber(hipoteke[hipoteka])}
                  </Td>
                  <Td p={[2, 5]} isNumeric>
                    {formatNumber(hipoteke[hipoteka])}
                  </Td>
                  <Td p={[2, 5]} isNumeric>
                    {formatNumber(hipoteke[hipoteka])}
                  </Td>
                </Tr>
              </Link>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th textAlign="center" p={[1, 5]}>
              <p className="lowercase font-extrabold text-xs md:text-lg">
                {/*formatNumber(sum)*/}
              </p>
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              <p className="lowercase font-extrabold text-xs md:text-lg">
                {formatNumber(sum)}
              </p>
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              <p className="lowercase font-extrabold text-xs md:text-lg">
                {formatNumber(sum)}
              </p>
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              <p className="lowercase font-extrabold text-xs md:text-lg">
                {formatNumber(sum)}
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
  const parcels = await Parcel.find({ vlasnistvo: name });
  //let opstineSum = await Parcel.aggregate([
  //  { $match: { vlasnistvo: name } },
  //  { $group: { _id: "$opstina", sum: { $sum: "$povrsina" } } },
  //]);
  //console.log(opstineSum);
  let vlasnistvoSum = await Parcel.aggregate([
    { $group: { _id: "$vlasnistvo", sum: { $sum: "$povrsina" } } },
    { $sort: { _id: -1 } },
  ]);
  const firme = {};
  vlasnistvoSum.map((e) => {
    firme[e._id] = { active: false };
  });
  console.log("parcel 0", parcels[0]);
  const sum = parcels.reduce(function (a, b) {
    return a + b.povrsina;
  }, 0);
  firme[`${name}`] = {
    active: true,
    sum: sum,
  };
  console.log("firme:", firme);
  let opstinePocetno = await Parcel.aggregate([
    {
      $group: {
        _id: { opstina: "$opstina", vlasnistvo: "$vlasnistvo" },
        sum: { $sum: "$povrsina" },
      },
    },
  ]);
  const opstineSrednjeno = makeOpstineFromFirme(firme, opstinePocetno);
  let hipoteke = {};
  let hipoteke_drugog_reda = {};
  parcels.map((parcel) => {
    if (parcel.hipoteka_1) {
      if (hipoteke[parcel.hipoteka_1]) {
        hipoteke[parcel.hipoteka_1] += parcel.povrsina;
      } else {
        hipoteke[parcel.hipoteka_1] = parcel.povrsina;
      }
    }
    if (parcel.hipoteka_2) {
      if (hipoteke[parcel.hipoteka_2]) {
        hipoteke[parcel.hipoteka_2] += parcel.povrsina;
      } else {
        hipoteke[parcel.hipoteka_2] = parcel.povrsina;
      }
      if (hipoteke_drugog_reda[parcel.hipoteka_2]) {
        hipoteke_drugog_reda[parcel.hipoteka_2] += parcel.povrsina;
      } else {
        hipoteke_drugog_reda[parcel.hipoteka_2] = parcel.povrsina;
      }
    }
  });
  console.log("Hipoteke:", hipoteke);
  console.log("Hipoteke 2 reda:", hipoteke_drugog_reda);
  return {
    props: {
      vlasnik: name,
      //parcelsJSON: JSON.stringify(parcels),
      sum: sum,
      opstine: opstineSrednjeno,
      hipoteke: hipoteke,
      hipoteke_drugog_reda: hipoteke_drugog_reda
    },
  };
}
