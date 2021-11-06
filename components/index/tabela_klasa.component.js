import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
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
import { formatNumber } from "../../utils/utils";
import { motion } from "framer-motion";

const TabelaKlasa = ({ objekat, klase }) => {
  const appear = {
    hidden: { opacity: 0, x: 0, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 0 },
  };
  let totalSum = 0;
  return (
    <motion.div
      variants={appear}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "easeIn", duration: 0.5 }}
      className="flex flex-col"
    >
      <Table
        className="text-xs md:text-base w-max"
        variant="striped"
        colorScheme="gray"
        mt={[2, 10]}
        //w="100%"
        w="w-max"
        size="lg"
        wrap="nowrap"
      >
        <TableCaption className="uppercase" placement="top">
          Pregled zemljišta po klasama
        </TableCaption>
        <Thead>
          <Tr wrap="nowrap">
            <Th key={"start"} textAlign="center" p={[0, 1]}></Th>
            {Object.keys(objekat)
              .sort()
              .map((f, index) => {
                return (
                  <Th key={index} textAlign="center" p={[0, 1]}>
                    {f}
                  </Th>
                );
              })}
            <Th>Ukupno:</Th>
          </Tr>
        </Thead>
        <Tbody>
          {klase.map((f, index) => {
            let s = 0;
            return (
              <Tr key={index}>
                <Td textAlign="center" p={[0, 1]}>
                  {f}
                </Td>
                {Object.keys(objekat)
                  .sort()
                  .map((e, index) => {
                    return (
                      <Td key={index} textAlign="center" p={[0, 1]}>
                        {formatNumber(objekat[e][f] ? objekat[e][f] : 0)}
                      </Td>
                    );
                  })}
                <Td textAlign="center" p={[0, 1]}>
                  {Object.keys(objekat).map((a) => {
                    s += objekat[a][f] ? objekat[a][f] : 0;
                  })}
                  {formatNumber(s)}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Ukupno:</Th>
            {Object.keys(objekat)
              .sort()
              .map((f, index) => {
                let sum = 0;
                Object.keys(objekat[f]).map((e) => {
                  sum += objekat[f][e];
                });
                return (
                  <Th key={index} textAlign="center" p={[0, 1]}>
                    <p className="lowercase font-extrabold text-xs md:text-lg">
                      {formatNumber(sum)}
                    </p>
                  </Th>
                );
              })}
            <Th>
              {Object.keys(objekat).map((e) => {
                Object.keys(objekat[e]).map((f) => {
                    totalSum += objekat[e][f] ? objekat[e][f] : 0
                });
              })}
              <p className="lowercase font-extrabold text-xs md:text-lg">
              { formatNumber(totalSum)}
              </p>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </motion.div>
  );
};

export default TabelaKlasa;
