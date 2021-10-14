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
  //console.log(ratio)
  return (
    <div id="map-layout" className="relative">
      {
        <Popover
          id={1}
          isOpen={isOpen}
          nOpen={onOpen}
          onClose={onClose}
          placement="right"
          closeOnBlur={false}
        >
          <PopoverContent top={806*ratio} left={858*ratio} width={40} className="" p={5}>
            eweqweqwe
          </PopoverContent>
        </Popover>
      }
      <ImageMapper
        imgWidth={mapa_width}
        onClick={(area) => console.log(area)}
        onMouseEnter={(area) => {
          console.log(area.center);
        }}
        onLoad={() => {
          //console.log(isOpen);
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
