import { useEffect, useState } from "react";
import {
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { ArrowLeftIcon, ChevronDownIcon, Window } from "@chakra-ui/icons";
import Link from "next/link";
const HomeButton = ({ handleCheckClick, firme, firmeArray }) => {
  return (
   
      <div className="absolute top-2 left-2 z-50">
        <Link to="/" as="/" href="/">
          <IconButton aria-label="go to home" icon={<ArrowLeftIcon />} />
        </Link>
      </div>
   
  );
};

export default HomeButton;
