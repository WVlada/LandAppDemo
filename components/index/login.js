import { useState, useEffect } from "react";
import Image from "next/image";
import landIco from "../../public/landicon1.png";
import { Button, Input, useToast, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/client";

export default function LoginScreen({}) {
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  console.log();
  const appear = {
    hidden: { opacity: 0, x: 0, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 0 },
  };
  const handleChange = (e) => {
    setPass(e.currentTarget.value);
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    setTimeout(async () => {
      const res = await signIn("credentials", {
        pass,
        callbackUrl: process.env.NEXTAUTH_URL,
        redirect: false,
      });
      if (res.error) {
        console.log("fails", res);
        toast({
          title: "Error!",
          description: "Password is not correct.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      } else {
        console.log("sucess:", res);
        setLoading(false);
      }
    }, 700);
  };
  return (
    <div className="flex flex-wrap w-full content-center bg-green-basic h-screen">
      <div className="flex flex-col bg-loginv bg-cover bg-no-repeat h-4/5 w-full justify-center">
        <motion.div
          variants={appear}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ type: "easeIn", duration: 0.8 }}
          className=""
        >
          <div className="flex-col bg-white text-center justify-center m-10 rounded-md shadow-2xl opacity-95">
            <div className="text-center font-oswald uppercase mt-7 p-7 font-bold text-green-basic text-2xl w-full md:text-3xl ">
              Land app.
            </div>
            <motion.div
              variants={appear}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={{ type: "easeIn", duration: 2 }}
            >
              <Image
                width={140}
                height={140}
                alt="ew"
                src={landIco}
                className=""
              />
            </motion.div>
            <HStack className="block m-auto mt-7 justify-center">
              <Input
                w={24}
                pt={0}
                pb={0}
                h={12}
                //lineHeight={10}
                fontSize={[12, 16, 16]}
                type="password"
                onChange={handleChange}
              />

              <Button
                bgColor={"#006871"}
                pt={0}
                pb={0}
                ml={2}
                h={12}
                className="rounded-sm text-white bg-green-basic font-oswald"
                fontSize={[12, 16, 16]}
                onClick={handleSubmit}
                isLoading={loading}
                _hover={{ bg: "#006871" }}
              >
                Login
              </Button>
            </HStack>
            <div className="text-right font-haas text-green-basic text-xs m-1 mt-3 mb-1 md:m-3 ">
              v. 1.0
            </div>
            {/*loading ? <div>jeew</div> : null*/}
          </div>
          <div className="h-40 md:h-96"></div>
        </motion.div>
      </div>
    </div>
  );
}
