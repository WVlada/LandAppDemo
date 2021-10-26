import Map from "../../components/index/map_component";
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

export default function Firma({ vlasnik, parcelsJSON }) {
  const parcels = JSON.parse(parcelsJSON);
  return (
    <Table
      className="text-xs md:text-lg"
      variant="striped"
      colorScheme="gray"
      mt={[2, 10]}
    >
      <TableCaption>Pregled svog zemljišta</TableCaption>
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
        {parcels.map((parcel) => {
          return (<Tr className="cursor-pointer" key={index}>
                <Link passHref href={`/vlasnik/${s}`} as={`/vlasnik/${s}`}>
                  <Td p={[1, 5]}>{s}</Td>
                </Link>
                <Td textAlign="right" p={[1, 5]}>
                  {formatNumber(firme[s].sum)}
                </Td>
                <Td p={[1, 5]} isNumeric>
                  {formatNumber(firme[s].sum)}
                </Td>
                <Td p={[1, 5]} isNumeric>
                  {formatNumber(firme[s].sum)}
                </Td>
              </Tr>)
          })}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th textAlign="center" p={[1, 5]}>
            <p className="lowercase font-extrabold text-xs md:text-lg">
              {formatNumber(sumOfAll())}
            </p>
          </Th>
          <Th textAlign="center" p={[1, 5]}>
            <p className="lowercase font-extrabold text-xs md:text-lg">
              {formatNumber(sumOfAll())}
            </p>
          </Th>
          <Th textAlign="center" p={[1, 5]}>
            <p className="lowercase font-extrabold text-xs md:text-lg">
              {formatNumber(sumOfAll())}
            </p>
          </Th>
          <Th textAlign="center" p={[1, 5]}>
            <p className="lowercase font-extrabold text-xs md:text-lg">
              {formatNumber(sumOfAll())}
            </p>
          </Th>
        </Tr>
      </Tfoot>
    </Table>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();

  const { name } = context.params;
  const parcels = await Parcel.find({ vlasnistvo: name });
  console.log(parcels)
  return {
    props: {
      vlasnik: name,
      parcelsJSON: JSON.stringify(parcels),
    },
  };
}
