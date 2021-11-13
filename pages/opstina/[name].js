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
import Homebutton from '../../components/home_button'
import HomeButton from "../../components/home_button";

export default function Firma({
  opstina,
  parcelsJSON,
  hipoteke,
  opstine,
  koJSON,
}) {
  const parcels = JSON.parse(parcelsJSON);
  const ko = JSON.parse(koJSON);

  return (
    <div className="flex flex-col flex-1 mb-10">
      <HomeButton />
      {<Map opstine={opstine} />}
      {Object.keys(ko).map((firma, index) => {
        return (
          <Table
            className="text-xs md:text-lg font-oswald"
            variant="striped"
            colorScheme="lime"
            mt={[2, 10]}
            key={index}
          >
            <TableCaption placement="top">
              <p className="font-oswald sm:text-lg">
                Pregled zemljišta:{" "}
                <Link
                  key={index}
                  passHref
                  href={`/vlasnik/${firma}`}
                  as={`/vlasnik/${firma}`}
                >
                  {firma}
                </Link>
              </p>
            </TableCaption>
            <Thead>
              <Tr>
                <Th textAlign="center" p={[1, 3]}>
                  <p className="font-oswald">Katastarska opština</p>
                </Th>
                <Th textAlign="center" p={[1, 3]}>
                  <p className="font-oswald">Površina</p>
                </Th>
                <Th textAlign="center" p={[1, 3]}>
                  <p className="font-oswald">Hipoteka</p>
                </Th>
                <Th textAlign="center" p={[1, 3]}>
                  <p className="font-oswald">Slobodno</p>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.keys(ko[firma]).map((kopstina, index) => {
                return (
                  <Link
                    passHref
                    key={index}
                    href={`/vlasnik/${opstina}/${firma}?opstina=true`}
                  >
                    <Tr className="cursor-pointer" key={index}>
                      <Td p={[1, 3]}>{kopstina}</Td>
                      <Td textAlign="right" p={[1, 3]}>
                        {formatNumber(
                          ko[firma][kopstina].reduce(
                            (a, b) => a + b.povrsina,
                            0
                          )
                        )}
                      </Td>
                      <Td p={[1, 3]} isNumeric>
                        {formatNumber(
                          hipoteke[firma] && hipoteke[firma][kopstina]
                            ? hipoteke[firma][kopstina]
                            : 0
                        )}
                      </Td>
                      <Td p={[1, 3]} isNumeric>
                        {formatNumber(
                          ko[firma][kopstina].reduce(
                            (a, b) => a + b.povrsina,
                            0
                          ) -
                            (hipoteke[firma] && hipoteke[firma][kopstina]
                              ? hipoteke[firma][kopstina]
                              : 0)
                        )}
                      </Td>
                    </Tr>
                  </Link>
                );
              })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th textAlign="center" p={[1, 3]}>
                  <p className="lowercase font-extrabold text-xs md:text-lg">
                    {}
                  </p>
                </Th>
                <Th textAlign="center" p={[1, 3]}>
                  <p className="lowercase font-oswald font-extrabold text-xs md:text-lg">
                    {formatNumber(
                      parcels.filter((p) => p._id == firma)[0]["sum"]
                    )}
                  </p>
                </Th>
                <Th textAlign="center" p={[1, 3]}>
                  <p className="lowercase font-oswald font-extrabold text-xs md:text-lg">
                    {formatNumber(
                      hipoteke[firma]
                        ? Object.keys(hipoteke[firma])
                            .map((e) => {
                              return hipoteke[firma][e];
                            })
                            .reduce((a, b) => a + b, 0)
                        : 0
                    )}
                  </p>
                </Th>
                <Th textAlign="center" p={[1, 3]}>
                  <p className="lowercase font-oswald font-extrabold text-xs md:text-lg">
                    {formatNumber(
                      parcels.filter((p) => p._id == firma)[0]["sum"] -
                        (hipoteke[firma]
                          ? Object.keys(hipoteke[firma])
                              .map((e) => {
                                return hipoteke[firma][e];
                              })
                              .reduce((a, b) => a + b, 0)
                          : 0)
                    )}
                  </p>
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        );
      })}
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
      ko[red.vlasnistvo] = {};
      ko[red.vlasnistvo][red.ko] = [red];
    }
  });
  //console.log("ko", ko);
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
  console.log("parcels", parcels);
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
      ko: "$ko",
    },
    sum: { $sum: "$povrsina" },
  });
  console.log("hip:", hip[0]);
  let hipoteke = {};
  hip.map((red) => {
    if (red._id.hipoteka_1 || red._id.hipoteka_2) {
      if (hipoteke[red._id.vlasnistvo]) {
        if (hipoteke[red._id.vlasnistvo][red._id.ko]) {
          hipoteke[red._id.vlasnistvo][red._id.ko] += red.sum;
        } else {
          hipoteke[red._id.vlasnistvo][red._id.ko] = red.sum;
        }
      } else {
        hipoteke[red._id.vlasnistvo] = {};
        hipoteke[red._id.vlasnistvo][red._id.ko] = red.sum;

        //hipoteke[red._id.vlasnistvo][red._id.ko] = red.sum;
      }
    } else {
    }
  });
  console.log("hipteke", hipoteke);

  //ko["Vanja N."]["Banatski brestovac"].map((a) => console.log(a.broj_parcele));

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
      koJSON: JSON.stringify(ko),
    },
  };
}
