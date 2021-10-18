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

const TableComponent = ({ data }) => {
  const handleChange = () => {};
  const formatNumber = (number) => {
    const x = String(number);
    switch (x) {
      case number > 1000:
        return "";

      case number > 100:
        return "";
    }
    return number;
  };
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
        {data.map((s, index) => {
          return (
            <Tr key={index}>
              <Td p={[1, 5]}>{s.vlasnistvo}</Td>
              <Td p={[1, 5]}>{formatNumber(s._sum.povrsina)}</Td>
              <Td p={[1, 5]} isNumeric>
                25.4
              </Td>
              <Td p={[1, 5]} isNumeric>
                25.4
              </Td>
            </Tr>
          );
        })}
      </Tbody>
      <Tfoot>
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
      </Tfoot>
    </Table>
  );
};

export default TableComponent;
