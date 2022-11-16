import { useState, useEffect } from "react";
import Poverilac from "../../models/poverilac";
import Link from "next/link";
import { ArrowLeftIcon, ChevronDownIcon, Window } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { Text, Textarea, IconButton, Button } from "@chakra-ui/react";
import dbConnect from "../../utils/mongoose";
import { useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function Pover({ poverilac }) {
  const pov = JSON.parse(poverilac);
  const router = useRouter();
  const [textvalue, setValue] = useState(pov.opis);
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast()
  const hadleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = async () => {
    setSubmitting(true);
    //console.log("value", textvalue);
    const res = await fetch("/api/set_opis", {
      method: "POST",
      body: JSON.stringify({ poverilac: pov.ime, textvalue: textvalue }),
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
      router.reload()
    }
    setSubmitting(false);
  };
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
      transition={{ type: "easeIn", duration: 1 }}
      className="flex flex-col"
    >
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
          <p className="font-oswald" mb="8px">
            Poverilac: {pov.ime}
          </p>
          <Textarea
            className="font-oswald mt-3"
            value={textvalue}
            onChange={hadleChange}
            placeholder="info..."
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
    </motion.div>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();
  const { poverilac } = context.params;
  //console.log(context.params);
  const pov = await Poverilac.findOne({ ime: poverilac });
  //console.log(pov);

  return {
    props: {
      poverilac: JSON.stringify(pov),
    },
  };
}
