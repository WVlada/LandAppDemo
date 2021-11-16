import LeftButtons from "../../../components/index/buttons_component";
import TableComponent from "../../../components/index/table.component";
import { useState, useEffect } from "react";
import Parcel from "../../../models/parcel";
import dbConnect from "../../../utils/mongoose";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { formatNumber, makeOpstineFromFirme } from "../../../utils/utils";
import Map from "../../../components/index/map_component";
import coords from "../../../utils/vojvodina_coordinates.json";
import { ArrowLeftIcon, ChevronDownIcon, Window } from "@chakra-ui/icons";

export default function Firma({ vlasnik, parcelsJSON, sum, opstine, opstina, backOpstina }) {
  const parcels = JSON.parse(parcelsJSON);
  const size = useBreakpointValue(["sm", "md", "lg"]);
  return (
    <div className="flex flex-col flex-1">
      {/*<Map opstine={opstine} />*/}
      <div className="absolute top-2 left-2 z-50">
        {backOpstina?
        <Link
          passHref
          to={`/opstina/${opstina}`}
          as={`/opstina/${opstina}`}
          href={`/opstina/${opstina}`}
        >
          <IconButton
            colorScheme="lime"
            size={size}
            aria-label="go to home"
            icon={<ArrowLeftIcon />}
          />
        </Link>
        :
        <Link
          passHref
          to={`/vlasnik/${vlasnik}`}
          as={`/vlasnik/${vlasnik}`}
          href={`/vlasnik/${vlasnik}`}
        >
          <IconButton
            colorScheme="lime"
            size={size}
            aria-label="go to home"
            icon={<ArrowLeftIcon />}
          />
        </Link>}
      </div>
      <Table
        className="font-oswald text-xs md:text-lg"
        variant="striped"
        colorScheme="lime"
        mt={[10, 20]}
      >
        <TableCaption placement="top">
          <p className="font-oswald text-base md:text-lg">
            Pregled svog zemljišta vlasnika {vlasnik} u opštini {opstina}
          </p>
        </TableCaption>
        <Thead>
          <Tr>
            <Th textAlign="center" p={[1, 5]}>
              <p className="font-oswald text-xs md:text-lg">KO</p>
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              <p className="font-oswald text-xs md:text-lg">Broj parcele</p>
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              <p className="font-oswald text-xs md:text-lg">Klasa</p>
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              <p className="font-oswald text-xs md:text-lg">Površina</p>
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              <p className="font-oswald text-xs md:text-lg">Hipoteka</p>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {parcels.map((parcel, index) => {
            return (
              <Tr className="cursor-pointer" key={index}>
                <Td p={[1, 2]}>{parcel.ko}</Td>
                <Td textAlign="right" p={[1, 5]}>
                  {parcel.broj_parcele}
                </Td>
                <Td p={[1, 5]} isNumeric>
                  {parcel.klasa}
                </Td>
                <Td p={[1, 5]} isNumeric>
                  {formatNumber(parcel.povrsina)}
                </Td>
                <Td isNumeric p={[1, 2]}>
                  {parcel.hipoteka_1 +
                    (parcel.hipoteka_2.length > 0
                      ? " & " + parcel.hipoteka_2
                      : "")}
                </Td>
              </Tr>
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
              <p className="lowercase font-extrabold text-xs md:text-lg"></p>
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              <p className="lowercase font-extrabold text-xs md:text-lg"></p>
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              <p className="lowercase font-extrabold text-xs md:text-lg"></p>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </div>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();

  // both can do
  const { name } = context.params;
  const { vlasnik } = context.query;
  const { opstina } = context.query;
  console.log(context.query);
  console.log(opstina);
  
  const parcels = await Parcel.find({ vlasnistvo: vlasnik, opstina: name }).sort({broj_parcele: 1});
  //let opstineSum = await Parcel.aggregate([
  //  { $match: { vlasnistvo: name } },
  //  { $group: { _id: "$opstina", sum: { $sum: "$povrsina" } } },
  //]);
  //console.log(opstineSum);
  //let vlasnistvoSum = await Parcel.aggregate([
  //  { $group: { _id: "$vlasnistvo", sum: { $sum: "$povrsina" } } },
  //  { $sort: { _id: -1 } },
  //]);
  //const firme = {};
  //vlasnistvoSum.map((e) => {
  //  firme[e._id] = { active: false };
  //});
  //console.log("parcel 0", parcels[0]);
  //const sum = parcels.reduce(function (a, b) {
  //  return a + b.povrsina;
  //}, 0);
  //firme[`${name}`] = {
  //  active: true,
  //  sum: sum,
  //};
  //console.log("firme:", firme);
  //let opstinePocetno = await Parcel.aggregate([
  //  {
  //    $group: {
  //      _id: { opstina: "$opstina", vlasnistvo: "$vlasnistvo" },
  //      sum: { $sum: "$povrsina" },
  //    },
  //  },
  //]);
  //const opstineSrednjeno = makeOpstineFromFirme(firme, opstinePocetno);
  
  return {
    props: {
      vlasnik: vlasnik,
      opstina: name,
      parcelsJSON: JSON.stringify(parcels),
      backOpstina: opstina ? opstina : false
      //sum: sum,
      //opstine: opstineSrednjeno,
    },
  };
}
