import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const FileUploadForm = () => {
  const router = useRouter();
  const toast = useToast();
  const [data, setData] = useState(null);
  const [submitActive, setSubmitActive] = useState(false);
  const onChangeInput = async (e) => {
    const selectedFile = document.getElementById("input").files[0];
    const ExcelJS = require("exceljs");
    const wb = new ExcelJS.Workbook();
    const reader = new FileReader();

    reader.readAsArrayBuffer(selectedFile);
    reader.onload = () => {
      const buffer = reader.result;
      wb.xlsx.load(buffer).then((workbook) => {
        let d = [];
        let worksheet = workbook.getWorksheet("sve");
        worksheet.eachRow((row, rowIndex) => {
          if (rowIndex == 1) {
            return;
          }
          d.push(row.values);
        });
        setData(d);
      });
    };
  };
  useEffect(() => {
    if (data) {
      setSubmitActive(true);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitActive(false);

    const res = await fetch("/api/upload_excel_table", {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: { "Content-Type": "application/json" },
    });
    const response = await res.json();
    if (res.status != 200) {
      toast({
        title: `${response.text}`,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: `${response.text}`,
        status: "success",
        isClosable: true,
      });
    }
    setData(null);
    router.reload();
  };
  return (
    <div className="text-xs mt-10">
      <form
        method="post"
        action="/api/upload_excel_table"
        encType="multipart/form-data"
      >
        <input
          id="input"
          name="excel_table"
          type="file"
          onChange={onChangeInput}
        />
        <Button
          fontSize={"inherit"}
          p={2}
          disabled={!submitActive}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FileUploadForm;
