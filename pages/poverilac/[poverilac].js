import { useState, useEffect } from "react";
import Poverilac from "../../../models/poverilac";
import Link from "next/link";
import { ArrowLeftIcon, ChevronDownIcon, Window } from "@chakra-ui/icons";
import { useRouter } from "next/router";
export default function Poverilac({ poverilac }) {
  const router = useRouter();
  return (
    <div className="flex flex-col flex-1">
      <div className="absolute top-2 left-2 z-50">
        {
          <IconButton
            onClick={() => router.back()}
            colorScheme="lime"
            size={size}
            aria-label="go to home"
            icon={<ArrowLeftIcon />}
          />
        }
      </div>
      Hello
    </div>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();

  const { poverilac } = context.params;
  console.log(poverilac);

  return {
    props: {
      poverilac: poverilac,
    },
  };
}
