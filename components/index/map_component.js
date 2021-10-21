import { useEffect, useState } from "react";
import { ImageMapper, ImageMapperProps } from "react-image-mapper2";
import mapa from "../../public/vojvodina_map.svg";
import coords from "../../utils/vojvodina_coordinates.json";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";

const Map = () => {
  let [layout, setLayout] = useState(0);
  let [ratio, setRatio] = useState(0);
  let mapa_width = mapa.width;
  const { onOpen, onClose, isOpen } = useDisclosure();
  
  useEffect(() => {
    window.addEventListener("load", function () {
      layout = document.getElementById("map-layout").offsetWidth;
      setLayout(layout);
      setRatio(layout/mapa_width)
    });
    window.addEventListener("resize", function () {
      layout = document.getElementById("map-layout").offsetWidth;
      setLayout(layout);
      setRatio(layout/mapa_width);
    });
  }, []);
  
  const handleLoad = ()=>{
    onOpen()
  }   
  return (
    <div id="map-layout" className="w-full min-w-0 h-auto flex flex-1">
      {coords.opstine.map((e) => {
        return (
          <Popover
            key={e.name}
            id={1}
            isOpen={isOpen}
            nOpen={onOpen}
            onClose={onClose}
            placement="right"
            closeOnBlur={false}
            w={0}
            className=""
          >
            <PopoverContent
              w={[20, 40]}
              className="text-xs md:text-xl"
              borderWidth={[1, 2]}
              borderColor={e.strokeColor}
              top={e.top * ratio}
              left={e.left * ratio}
              p={[1, 2]}
            >
              eweqweqwe
            </PopoverContent>
          </Popover>
        );
      })}
      <ImageMapper
        imgWidth={mapa_width}
        onClick={(area) => console.log(area)}
        onMouseEnter={(area) => {
          //console.log(area.center);
        }}
        onLoad={() => {
          handleLoad();
        }}
        active
        width={layout}
        src={mapa.src}
        map={{
          name: "mapa vojvodine",
          areas: coords.opstine,
        }}
      />
    </div>
  );
};

export default Map;
