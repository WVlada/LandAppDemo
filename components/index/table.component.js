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

const TableComponent = ({ firme, firmeArray, hipoteke }) => {
  const appear = {
    hidden: { opacity: 0, x: 0, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 0 },
  };
  const handleChange = () => {};
  const keys = Object.keys(hipoteke);
  let hipoteke_sum = 0;
  console.log("iz tabele*******************", hipoteke)
  keys.map((key) => {
    if (hipoteke[key]) {
      hipoteke_sum += hipoteke[key];
    }
    if(key == 'Nicco Agrar'){
      console.log(hipoteke[key])
    }
  });
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
        className="text-xs md:text-lg font-oswald"
        variant="striped"
        colorScheme="lime"
        mt={[2, 10]}
        w="100%"
      >
        <TableCaption className="uppercase" placement="top">
          <p className="uppercase font-oswald font-lg">Pregled zemljišta</p>
        </TableCaption>
        <Thead>
          <Tr>
            <Th w={"53px"} textAlign="center" p={[1, 3]}>
              <p className="uppercase font-oswald">Vlasnik</p>
            </Th>
            <Th textAlign="center" p={[1, 2]}>
              <p className="uppercase font-oswald">Površina</p>
            </Th>
            <Th textAlign="center" p={[1, 2]}>
              <p className="uppercase font-oswald">Hipoteka</p>
            </Th>
            <Th textAlign="center" p={[1, 2]}>
              <p className="uppercase font-oswald">Slobodno</p>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {firmeArray.map((s, index) => {
            if (!firme[s].active) {
              return;
            } else {
              return (
                <Link
                  key={index}
                  passHref
                  href={`/vlasnik/${s}`}
                  as={`/vlasnik/${s}`}
                >
                  <Tr className="cursor-pointer">
                    <Td
                      fontSize={[11, 12, 14]}
                      className="truncate overflow-ellipsis"
                      p={[1, 3]}
                    >
                      {s}
                    </Td>

                    <Td fontSize={[11, 12, 14]} textAlign="right" p={[1, 2]}>
                      {formatNumber(firme[s].sum)}
                    </Td>
                    <Td fontSize={[11, 12, 14]} p={[1, 2]} isNumeric>
                      {hipoteke[s]
                        ? formatNumber(hipoteke[s])
                        : formatNumber(0)}
                    </Td>
                    <Td fontSize={[11, 12, 14]} p={[1, 2]} isNumeric>
                      {hipoteke[s]
                        ? formatNumber(firme[s].sum - hipoteke[s])
                        : formatNumber(firme[s].sum)}
                    </Td>
                  </Tr>
                </Link>
              );
            }
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th textAlign="center" fontSize={[10, 12]} p={[0, 3]}>
              <p className="lowercase md:text-lg"></p>
            </Th>
            <Th textAlign="center" fontSize={[10, 12]} p={[0, 3]}>
              <p className="lowercase md:text-lg font-oswald">
                {formatNumber(sumOfAll())}
              </p>
            </Th>
            <Th textAlign="center" fontSize={[10, 12]} p={[0, 3]}>
              <p className="lowercase md:text-lg font-oswald">
                {formatNumber(hipoteke_sum)}
              </p>
            </Th>
            <Th textAlign="center" fontSize={[10, 12]} p={[0, 3]}>
              <p className="lowercase md:text-lg font-oswald">
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
