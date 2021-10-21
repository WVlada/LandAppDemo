import { useEffect, useState } from "react";
import { CheckboxGroup, Checkbox, VStack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const LeftButtons = ({ data, handleCheckClick  }) => {
  
  return (
    <div className="text-xs md:text-lg flex flex-col w-24 mt-5">
      {data.map((s, index) => {
        return (
          <Checkbox
            className="truncate overflow-ellipsis"
            p={[1, 2]}
            h={5}
            key={s.vlasnistvo}
            fontSize={[12, 16]}
            mt={[0,5]}
            value={s.vlasnistvo}
            isChecked={s.selected}
            onChange={(e) => handleCheckClick(e.currentTarget.value)}
          >
            {s.vlasnistvo}
          </Checkbox>
        );
      })}
    </div>
  );
};

export default LeftButtons;
