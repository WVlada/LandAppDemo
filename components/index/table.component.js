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
    if (number > 10000) {
      let y = x.split("");
      y.splice(y.length - 4, 0, "h ");
      y.splice(y.length - 2, 0, "a ");
      y.splice(y.length, 0, "m ");
      return y;
    } else if (number > 100) {
      let y = x.split("");
      y.splice(y.length - 2, 0, "a ");
      y.splice(y.length, 0, "m ");
      return y;
    } else {
      let y = x.split("");
      y.splice(y.length, 0, "m ");
      return y;
    }
  };
  const sumOfAll = ()=>{
    let s = 0;
    data.map((e)=>{
      if (e.selected){
        s+= e._sum.povrsina
      }
    })
    return s
  }
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
          if (!s.selected) {
            return;
          } else {
            return (
              <Tr key={index}>
                <Td p={[1, 5]}>{s.vlasnistvo}</Td>
                <Td textAlign="right" p={[1, 5]}>
                  {formatNumber(s._sum.povrsina)}
                </Td>
                <Td p={[1, 5]} isNumeric>
                  {formatNumber(s._sum.povrsina)}
                </Td>
                <Td p={[1, 5]} isNumeric>
                  {formatNumber(s._sum.povrsina)}
                </Td>
              </Tr>
            );
          }
        })}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th textAlign="center" p={[1, 5]}>
          <p className="lowercase">{formatNumber(sumOfAll())}</p>
          </Th>
          <Th textAlign="center" p={[1, 5]}>
            <p className="lowercase">{formatNumber(sumOfAll())}</p>
          </Th>
          <Th textAlign="center" p={[1, 5]}>
          <p className="lowercase">{formatNumber(sumOfAll())}</p>
          </Th>
          <Th textAlign="center" p={[1, 5]}>
          <p className="lowercase">{formatNumber(sumOfAll())}</p>
          </Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

export default TableComponent;