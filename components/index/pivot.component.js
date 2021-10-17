import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import Script from "next/script";

const PivotTable = ({data}) => {
    const handleChange = ()=>{}
    $("#output").pivot(
    [
        {color: "blue", shape: "circle"},
        {color: "red", shape: "triangle"}
    ],
    {
        rows: ["color"],
        cols: ["shape"]
    }

    )
};

export default PivotTable;
