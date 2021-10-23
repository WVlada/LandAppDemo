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

const LeftButtons = ({ handleCheckClick, firme, firmeArray }) => {
  return (
    <div className="flex flex-col mt-12 ">
      <div className="absolute top-2 left-2 z-50">
        <Menu closeOnSelect={false}>
          <MenuButton
            as={IconButton}
            w={0}
            icon={<HamburgerIcon />}
          ></MenuButton>
          <MenuList>
            {firmeArray.map((s, index) => {
              return (
                <MenuItem key={s}>
                  <Checkbox
                    className="truncate overflow-ellipsis mt-0 lg:mt-5"
                    p={[1, 2]}
                    h={4}
                    fontSize={8}
                    value={s}
                    isChecked={firme[s]["active"]}
                    onChange={(e) => handleCheckClick(e.currentTarget.value)}
                  >
                    <p className="text-xs md:text-lg p-0">{s}</p>
                  </Checkbox>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default LeftButtons;
