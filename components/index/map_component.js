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

const Map = ({ opstine }) => {
  let [layout, setLayout] = useState(0);
  let [ratio, setRatio] = useState(0);
  let [height, setHeight] = useState(0);
  let [ratioH, setRatioH] = useState(0);
  let mapa_width = mapa.width;
  let mapa_height = mapa.height;
  const { onOpen, onClose, isOpen } = useDisclosure();

  useEffect(() => {
    window.addEventListener("load", function () {
      layout = document.getElementById("map-layout").offsetWidth;
      height = document.getElementById("map-layout").offsetHeight;
      setLayout(layout);
      setHeight(height);
      setRatioH(height / mapa_height);
      setRatio(layout / mapa_width);
    });
    window.addEventListener("resize", function () {
      layout = document.getElementById("map-layout").offsetWidth;
      height = document.getElementById("map-layout").offsetHeight;
      setLayout(layout);
      setHeight(height);
      setRatioH(height / mapa_height);
      setRatio(layout / mapa_width);
    });
  }, []);
  const formatNumber = (number) => {
    const x = String(number);
    if (number > 10000) {
      let y = x.split("");
      y.splice(y.length - 4, 0, "h ");
      y.splice(y.length - 2, 0, "a ");
      y.splice(y.length, 0, "m ");
      return y;
    } else if (number > 100) {
      let y = x.split("");
      y.splice(y.length - 2, 0, "a ");
      y.splice(y.length, 0, "m ");
      return y;
    } else {
      let y = x.split("");
      y.splice(y.length, 0, "m ");
      return y;
    }
  };
  //const [opstineSrednjeno, setOpstineSredjeno] = useState(Object.keys(opstine));
  //useEffect(() => {
  //  let newOpstine = Object.keys(opstine);
  //  setOpstineSredjeno(newOpstine);
  //}, [opstine]);
  const handleLoad = () => {
    onOpen();
  };
  return (
    <div id="map-layout" className="w-full min-w-0 h-auto flex flex-1 mt-6">
      <Popover
        id={`${1}-menu-id`}
        key={1}
        isOpen={true}
        nOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
        className="block"
      >
        {coords.opstine
          .filter((e) => Object.keys(opstine).includes(e.name))
          .map((opstina, index) => {
            return (
              <PopoverContent
                //w={[24, 40]}
                textAlign="right"
                className="text-xs md:text-xl max-w-max"
                borderWidth={[1, 2]}
                borderColor={opstina.strokeColor}
                top={opstina.top * ratio}
                left={opstina.left * ratio}
                p={[1, 2]}
                key={index}
              >
                {formatNumber(opstine[opstina.name].sum)}
              </PopoverContent>
            );
          })}
      </Popover>
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
          areas: coords.opstine.filter((e) =>
            Object.keys(opstine).includes(e.name)
          ), //coords.opstine,
        }}
      />
    </div>
  );
};

export default Map;
