import { useEffect, useState } from "react";
import { CheckboxGroup, Checkbox, VStack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const LeftButtons = ({ handleCheckClick, firme, firmeArray }) => {
  return (
    <div className="text-xs md:text-lg flex flex-col w-24 mt-5">
      {firmeArray.map((s, index) => {
        return (
          <Checkbox
            className="truncate overflow-ellipsis"
            p={[1, 2]}
            h={5}
            key={s}
            fontSize={[12, 16]}
            mt={[0, 5]}
            value={s}
            isChecked={firme[s]['active']}
            onChange={(e) => handleCheckClick(e.currentTarget.value)}
          >
            {s}
          </Checkbox>
        );
      })}
    </div>
  );
};

export default LeftButtons;
