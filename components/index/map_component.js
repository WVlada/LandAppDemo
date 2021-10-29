import { useEffect, useState } from "react";
import { ImageMapper, ImageMapperProps } from "react-image-mapper2";
import mapa from "../../public/vojvodina_map1.svg";
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
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const Map = ({ opstine }) => {
  let mapa_width = mapa.width;
  let mapa_height = mapa.height;
  let [layout, setLayout] = useState(0);
  let [ratio, setRatio] = useState(mapa_width / mapa_height);

  const { onOpen, onClose, isOpen } = useDisclosure();
  const router = useRouter();

  const appear = {
    hidden: { opacity: 0, x: 0, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 0 },
  };

  useEffect(() => {
    let handler = ()=> {
      layout = document.getElementById("map-layout").offsetWidth;
      setLayout(layout);
      setRatio(layout / mapa_width);
    }
    window.addEventListener("resize", handler)
    //window.addEventListener("resize", function () {
    //  layout = document.getElementById("map-layout").offsetWidth;
    //  setLayout(layout);
    //  setRatio(layout / mapa_width);
    //});
    return () => window.removeEventListener('resize', handler)
  }, []);

  useEffect(() => {
    layout = document.getElementById("map-layout").offsetWidth;
    setLayout(layout);
    setRatio(layout / mapa_width);
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
    <div
      id="map-layout"
      className="w-full min-w-0 h-full flex flex-col flex-1 mt-6 "
    >
      <motion.div
        variants={appear}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "easeIn", duration: 0.5 }}
        className="flex flex-col"
      >
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
          className="flex"
          imgWidth={mapa_width}
          onClick={(area) => router.push(`/opstina/${area.name}`)}
          onMouseEnter={(area) => {
            //console.log(area.center);
          }}
          onLoad={() => {
            handleLoad();
          }}
          active
          width={layout}
          height={layout * (mapa_height / mapa_width)}
          src={mapa.src}
          map={{
            name: "mapa vojvodine",
            areas: coords.opstine.filter((e) =>
              Object.keys(opstine).includes(e.name)
            ), //coords.opstine,
          }}
        />
      </motion.div>
    </div>
  );
};

export default Map;
