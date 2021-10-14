import { useEffect, useState } from "react";
import { Button, ButtonGroup, VStack  } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const LeftButtons = () => {
  const toast = useToast();
  const handleResetButtonClick = async () => {
    const res = await fetch("/api/reset_database", {});
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
        status: 'success',
        isClosable: true,
      });
    }
  };
  return (
    <div className="text-xs">
      <Button onClick={handleResetButtonClick} p={2} fontSize={"inherit"}>
        <p className="block">reset</p>
      </Button>
      <Button p={2} fontSize={"inherit"}>
        ewe
      </Button>
      <Button p={2} fontSize={"inherit"}>
        ewe
      </Button>
      <Button p={2} fontSize={"inherit"}>
        ewe
      </Button>
    </div>
  );
};

export default LeftButtons;
