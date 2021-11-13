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
import { HamburgerIcon, ChevronDownIcon, Window } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const LeftButtons = ({ handleCheckClick, firme, firmeArray }) => {
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
      <div className="flex flex-col mt-12 ">
        <div className="absolute top-2 left-2 z-50">
          <Menu closeOnSelect={false}>
            <MenuButton
              as={IconButton}
              w={0}
              colorScheme="lime"
              icon={<HamburgerIcon />}
            ></MenuButton>
            <MenuList>
              {firmeArray.map((s, index) => {
                return (
                  <MenuItem key={s}>
                    <Checkbox
                      className="truncate overflow-ellipsis "
                      p={[1, 2]}
                      h={[4, 6]}
                      fontSize={8}
                      value={s}
                      isChecked={firme[s]["active"]}
                      onChange={(e) => handleCheckClick(e.currentTarget.value)}
                    >
                      <p className="text-xs md:text-lg p-0 font-oswald">
                        {s}
                      </p>
                    </Checkbox>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </div>
      </div>
    </motion.div>
  );
};

export default LeftButtons;
