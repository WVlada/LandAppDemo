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

export default function Firma({ vlasnik, parcelsJSON, sum, opstine }) {
  const parcels = JSON.parse(parcelsJSON);
  return (
    <div className="flex flex-col flex-1">
      <Map opstine={opstine} />
      <Table
        className="text-xs md:text-lg"
        variant="simple"
        colorScheme="gray"
        mt={[2, 10]}
      >
        <TableCaption>Pregled svog zemljišta</TableCaption>
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
                <Td p={[1, 5]}>{opstina}</Td>
                <Td textAlign="right" p={[1, 5]}>
                  {formatNumber(opstine[opstina].sum)}
                </Td>
                <Td p={[1, 5]} isNumeric>
                  {formatNumber(opstine[opstina].sum)}
                </Td>
                <Td p={[1, 5]} isNumeric>
                  {formatNumber(opstine[opstina].sum)}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
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
  return {
    props: {
      vlasnik: name,
      parcelsJSON: JSON.stringify(parcels),
      sum: sum,
      opstine: opstineSrednjeno,
    },
  };
}
