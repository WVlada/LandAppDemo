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
import {formatNumber} from '../../utils/utils'
import { motion } from "framer-motion"; 

const TableComponent = ({ firme, firmeArray, hipoteke }) => {
  const appear = {
    hidden: { opacity: 0, x: 0, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 0 },
  };
  const handleChange = () => {};
  const keys = Object.keys(hipoteke)
  let hipoteke_sum = 0;
  keys.map((key)=>{
    if(hipoteke[key]){
      hipoteke_sum += hipoteke[key]
    }
  }) 
  const sumOfAll = () => {
    let s = 0;
    firmeArray.map((e) => {
      if (firme[e].active) {
        s += firme[e].sum;
      }
    });
    return s;
  };
  return (
    <motion.div
      variants={appear}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "easeIn", duration: 1 }}
      className="flex flex-col"
    >
      <Table
        className="text-xs md:text-lg"
        variant="striped"
        colorScheme="gray"
        mt={[2, 10]}
        w="100%"
      >
        <TableCaption className="uppercase" placement="top">
          Pregled zemljišta
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
          {firmeArray.map((s, index) => {
            if (!firme[s].active) {
              return;
            } else {
              return (
                <Tr className="cursor-pointer" key={index}>
                  <Link passHref href={`/vlasnik/${s}`} as={`/vlasnik/${s}`}>
                    <Td p={[1, 5]}>{s}</Td>
                  </Link>
                  <Td textAlign="right" p={[1, 5]}>
                    {formatNumber(firme[s].sum)}
                  </Td>
                  <Td p={[1, 5]} isNumeric>
                    {hipoteke[s] ? formatNumber(hipoteke[s]) : 0}
                  </Td>
                  <Td p={[1, 5]} isNumeric>
                    {hipoteke[s]
                      ? formatNumber(firme[s].sum - hipoteke[s])
                      : formatNumber(firme[s].sum)}
                  </Td>
                </Tr>
              );
            }
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th textAlign="center" p={[1, 5]}>
              <p className="lowercase font-extrabold text-xs md:text-lg"></p>
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              <p className="lowercase font-extrabold text-xs md:text-lg">
                {formatNumber(sumOfAll())}
              </p>
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              <p className="lowercase font-extrabold text-xs md:text-lg">
                {formatNumber(hipoteke_sum)}
              </p>
            </Th>
            <Th textAlign="center" p={[1, 5]}>
              <p className="lowercase font-extrabold text-xs md:text-lg">
                {formatNumber(sumOfAll() - hipoteke_sum)}
              </p>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </motion.div>
  );
};

export default TableComponent;
