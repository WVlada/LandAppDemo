import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

const FileUploadForm = () => {
  return (
    <div className="text-xs">
      <form
        method="post"
        action="/api/upload_excel_table"
        encType="multipart/form-data"
      >
        <input name="excel_table" type="file" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FileUploadForm;
