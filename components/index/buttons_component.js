import { useEffect, useState } from "react";
import { Button, ButtonGroup, VStack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import FileUploadForm from "./upload_file";

const LeftButtons = () => {
  return (
    <div className="text-xs">
      <FileUploadForm />
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
