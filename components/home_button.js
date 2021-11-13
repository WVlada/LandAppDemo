import { useEffect, useState } from "react";
import {
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { ArrowLeftIcon, ChevronDownIcon, Window } from "@chakra-ui/icons";
import Link from "next/link";
const HomeButton = ({ }) => {
  return (
    <div className="absolute top-2 left-2 z-50">
      <Link passHref to="/" as="/" href="/">
        <IconButton
        colorScheme="lime"
          size={useBreakpointValue(["sm", "md", "lg"])}
          aria-label="go to home"
          icon={<ArrowLeftIcon />}
        />
      </Link>
    </div>
  );
};

export default HomeButton;
