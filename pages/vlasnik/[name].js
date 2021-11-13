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
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { formatNumber, makeOpstineFromFirme } from "../../utils/utils";
import Map from "../../components/index/map_component";
import coords from "../../utils/vojvodina_coordinates.json";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import HomeButton from "../../components/home_button";
export default function Firma({
  vlasnik,
  sum,
  opstine,
  hipoteke,
  hipoteke_drugog_reda,
  suma_hipoteka,
  hipoteke_sve_keys,
}) {
  //const parcels = JSON.parse(parcelsJSON)
  //console.log(vlasnik);
  //console.log( parcelsJSON);
  //console.log(sum);
  //console.log(opstine);
  let suma_donja_tabela_hip_1 = 0;
  let suma_donja_tabela_hip_2 = 0;
  let suma_donja_tabela_hip = 0;
  return (
    <div className="flex flex-col flex-1">
      <HomeButton />
      <Map opstine={opstine} />
      <Table
        className="text-xs md:text-lg font-oswald"
        variant="simple"
        colorScheme="gray"
        mt={[2, 10]}
      >
        <TableCaption placement="top">
          <p className="font-oswald text-base md:text-lg">
            Pregled svog zemljišta vlasnika: {vlasnik}
          </p>
        </TableCaption>
        <Thead>
          <Tr>
            <Th textAlign="center" p={[1, 3]}>
              <p className="font-oswald text-xs md:text-lg">Opština</p>
            </Th>
            <Th textAlign="center" p={[1, 3]}>
              <p className="font-oswald text-xs md:text-lg">Površina</p>
            </Th>
            <Th textAlign="center" p={[1, 3]}>
              <p className="font-oswald text-xs md:text-lg">Hipoteka</p>
            </Th>
            <Th textAlign="center" p={[1, 3]}>
              <p className="font-oswald text-xs md:text-lg">Slobodno</p>
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
                  <Td p={[2, 3]}>{opstina}</Td>
                  <Td textAlign="right" p={[2, 3]}>
                    {formatNumber(opstine[opstina].sum)}
                  </Td>
                  <Td p={[2, 3]} isNumeric>
                    {formatNumber(suma_hipoteka)}
                  </Td>
                  <Td p={[2, 3]} isNumeric>
                    {formatNumber(opstine[opstina].sum - suma_hipoteka)}
                  </Td>
                </Tr>
              </Link>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th textAlign="center" p={[1, 3]}>
              <p className="lowercase font-oswald font-extrabold text-xs md:text-lg">
                {/*formatNumber(sum)*/}
              </p>
            </Th>
            <Th textAlign="center" p={[1, 3]}>
              <p className="lowercase font-oswald font-extrabold text-xs md:text-lg">
                {formatNumber(sum)}
              </p>
            </Th>
            <Th textAlign="center" p={[1, 3]}>
              <p className="lowercase font-oswald font-extrabold text-xs md:text-lg">
                {formatNumber(suma_hipoteka)}
              </p>
            </Th>
            <Th textAlign="center" p={[1, 3]}>
              <p className="lowercase font-oswald font-extrabold text-xs md:text-lg">
                {formatNumber(sum - suma_hipoteka)}
              </p>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
      <div></div>
      <Table
        className="text-xs md:text-lg font-oswald"
        variant="simple"
        colorScheme="gray"
        mt={[2, 10]}
      >
        <TableCaption placement="top">
          <p className="font-oswald text-base md:text-lg">Pregled hipoteka</p>
        </TableCaption>
        <Thead>
          <Tr>
            <Th textAlign="center" p={[1, 3]}>
              <p className="font-oswald text-xs md:text-lg">Banka/poverilac:</p>
            </Th>
            <Th textAlign="center" p={[1, 3]}>
              <p className="font-oswald text-xs md:text-lg">Hipoteka I:</p>
            </Th>
            <Th textAlign="center" p={[1, 3]}>
              <p className="font-oswald text-xs md:text-lg">Hipoteka II:</p>
            </Th>
            <Th textAlign="center" p={[1, 3]}>
              <p className="font-oswald text-xs md:text-lg">Ukupno:</p>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {hipoteke_sve_keys.map((hipoteka, index) => {
            suma_donja_tabela_hip_1 += hipoteke[hipoteka]
              ? hipoteke[hipoteka]
              : 0;
            suma_donja_tabela_hip_2 += hipoteke_drugog_reda[hipoteka]
              ? hipoteke_drugog_reda[hipoteka]
              : 0;
            suma_donja_tabela_hip +=
              (hipoteke[hipoteka] ? hipoteke[hipoteka] : 0) +
              (hipoteke_drugog_reda[hipoteka]
                ? hipoteke_drugog_reda[hipoteka]
                : 0);
            return (
              <Link passHref key={index} href="/">
                <Tr style={{}} className="cursor-pointer" key={index}>
                  <Td p={[2, 3]}>{hipoteka}</Td>
                  <Td textAlign="right" p={[2, 3]}>
                    <p className="font-oswald">
                      {hipoteke[hipoteka]
                        ? formatNumber(hipoteke[hipoteka])
                        : ""}
                    </p>
                  </Td>
                  <Td p={[2, 3]} isNumeric>
                    <p className="font-oswald">
                      {hipoteke_drugog_reda[hipoteka]
                        ? formatNumber(hipoteke_drugog_reda[hipoteka])
                        : ""}
                    </p>
                  </Td>
                  <Td isNumeric>
                    <p className="font-oswald">
                      {formatNumber(
                        (hipoteke[hipoteka] ? hipoteke[hipoteka] : 0) +
                          (hipoteke_drugog_reda[hipoteka]
                            ? hipoteke_drugog_reda[hipoteka]
                            : 0)
                      )}
                    </p>
                  </Td>
                </Tr>
              </Link>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th textAlign="center" p={[1, 3]}>
              <p className="lowercase font-oswald font-extrabold text-xs md:text-lg">
                {/*formatNumber(sum)*/}
              </p>
            </Th>
            <Th textAlign="center" p={[1, 3]}>
              <p className="lowercase font-oswald font-extrabold text-xs md:text-lg">
                {formatNumber(suma_donja_tabela_hip_1)}
              </p>
            </Th>
            <Th textAlign="center" p={[1, 3]}>
              <p className="lowercase font-oswald font-extrabold text-xs md:text-lg">
                {formatNumber(suma_donja_tabela_hip_2)}
              </p>
            </Th>
            <Th textAlign="center" p={[1, 3]}>
              <p className="lowercase font-oswald font-extrabold text-xs md:text-lg">
                {formatNumber(suma_donja_tabela_hip)}
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
  //console.log("parcel 0", parcels[0]);
  const sum = parcels.reduce(function (a, b) {
    return a + b.povrsina;
  }, 0);
  firme[`${name}`] = {
    active: true,
    sum: sum,
  };
  //console.log("firme:", firme);
  let opstinePocetno = await Parcel.aggregate([
    {
      $group: {
        _id: { opstina: "$opstina", vlasnistvo: "$vlasnistvo", hipoteka_1: "$hipoteka_1" },
        sum: { $sum: "$povrsina" },
      },
    },
  ]);
  //console.log("opstinePocetno:", opstinePocetno);
  const opstineSrednjeno = makeOpstineFromFirme(firme, opstinePocetno);
  //console.log("opstineSrednjeno:", opstineSrednjeno);
  let hipoteke = {};
  let hipoteke_drugog_reda = {};
  let suma_hipoteka = 0;
  parcels.map((parcel) => {
    if (parcel.hipoteka_1) {
      if (hipoteke[parcel.hipoteka_1]) {
        hipoteke[parcel.hipoteka_1] += parcel.povrsina;
      } else {
        hipoteke[parcel.hipoteka_1] = parcel.povrsina;
      }
      suma_hipoteka += parcel.povrsina
    }
    if (parcel.hipoteka_2) {
      //if (hipoteke[parcel.hipoteka_2]) {
      //  hipoteke[parcel.hipoteka_2] += parcel.povrsina;
      //} else {
      //  hipoteke[parcel.hipoteka_2] = parcel.povrsina;
      //}
      if (hipoteke_drugog_reda[parcel.hipoteka_2]) {
        hipoteke_drugog_reda[parcel.hipoteka_2] += parcel.povrsina;
      } else {
        hipoteke_drugog_reda[parcel.hipoteka_2] = parcel.povrsina;
      }
      //suma_hipoteka += parcel.povrsina;
    }
  });
  let hipoteke_sve_keys = Object.keys(hipoteke)
  Object.keys(hipoteke_drugog_reda).map(e=>{
    if(!hipoteke_sve_keys.includes(e))
    hipoteke_sve_keys.push(e)
  })
  
  //console.log("hipoteke_sve_keys:", hipoteke_sve_keys);
  //console.log("Hipoteke:", hipoteke);
  //console.log("Hipoteke 2 reda:", hipoteke_drugog_reda);
  //console.log("suma_hipoteka:", suma_hipoteka);
  return {
    props: {
      vlasnik: name,
      //parcelsJSON: JSON.stringify(parcels),
      sum: sum,
      opstine: opstineSrednjeno,
      hipoteke: hipoteke,
      hipoteke_drugog_reda: hipoteke_drugog_reda,
      suma_hipoteka: suma_hipoteka,
      hipoteke_sve_keys: hipoteke_sve_keys,
    },
  };
}
