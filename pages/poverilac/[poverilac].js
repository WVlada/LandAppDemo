import { useState, useEffect } from "react";
import Poverilac from "../../models/poverilac";
import Link from "next/link";
import { ArrowLeftIcon, ChevronDownIcon, Window } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { Text, Textarea, IconButton, Button } from "@chakra-ui/react";
import dbConnect from "../../utils/mongoose";
import { useToast } from "@chakra-ui/react";
export default function Pover({ poverilac }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const hadleChange = (e) => {
    setValue(e.value);
  };
  const handleSubmit = async (e) => {
    setSubmitting(true);

    const res = await fetch("/api/set_opis", {
      method: "POST",
      body: JSON.stringify({ value }),
      headers: { "Content-Type": "application/json" },
    });
    const response = await res.json();
    if (res.status != 200) {
      toast({
        title: `${response.text}`,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: `${response.text}`,
        status: "success",
        isClosable: true,
      });
    }
    setSubmitting(false);
  };
  return (
    <div className="flex flex-col flex-1">
      <div className="absolute top-2 left-2 z-50">
        {
          <IconButton
            onClick={() => router.back()}
            colorScheme="lime"
            size="md"
            aria-label="go to home"
            icon={<ArrowLeftIcon />}
          />
        }
      </div>
      <div className="mt-14">
        <p className="font-oswald" mb="8px">Poverilac: {poverilac}</p>
        <Textarea
          className="font-oswald mt-3"
          value={value}
          onChange={hadleChange}
          placeholder="opšte informacije"
          size="sm"
        />
        <Button
          bgColor={"#006871"}
          pt={0}
          mt={3}
          pb={0}
          className="shad2 rounded-sm text-white bg-green-basic font-oswald"
          fontSize={[12, 16, 16]}
          onClick={handleSubmit}
          isLoading={submitting}
          _hover={{ bg: "#006871" }}
        >
         Snimi
        </Button>
      </div>
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
