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
            {Object.keys(objekat).map((f, index) => {
              return (
                <Th key={index} textAlign="center" p={[0, 1]}>
                  {f}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {klase.map((f, index) => {
            return (
              <Tr key={index}>
                <Td textAlign="center" p={[0, 1]}>
                  {f}
                </Td>
                {Object.keys(objekat).map((e, index) => {
                  return (
                    <Td key={index} textAlign="center" p={[0, 1]}>
                      {formatNumber(objekat[e][f] ? objekat[e][f] : 0)}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th></Th>
            {Object.keys(objekat).map((f, index) => {
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
          </Tr>
        </Tfoot>
      </Table>
    </motion.div>
  );
};

export default TabelaKlasa;
