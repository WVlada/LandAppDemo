import { useEffect, useState } from "react";
import { Button, ButtonGroup, VStack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";


const LeftButtons = () => {
  return (
    <div className="text-xs flex flex-col">
      
      <Button p={[1, 2]} h={5} fontSize={"inherit"}>
        agrobanat
      </Button>
      <Button p={[1, 2]} h={5} fontSize={"inherit"}>
        nicco
      </Button>
      <Button p={[1, 2]} h={5} fontSize={"inherit"}>
        polet
      </Button>
      <Button p={[1, 2]} h={5} fontSize={"inherit"}>
        DJn
      </Button>
      <Button p={[1, 2]} h={5} fontSize={"inherit"}>
        ewe
      </Button>
      <Button p={[1, 2]} h={5} fontSize={"inherit"}>
        ewe
      </Button>
      <Button p={[1, 2]} h={5} fontSize={"inherit"}>
        ewe
      </Button>
    </div>
  );
};

export default LeftButtons;
