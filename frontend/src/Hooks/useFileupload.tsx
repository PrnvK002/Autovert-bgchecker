import { useEffect, useState } from "react";
import Client from "../utils/axiosinstance.util";

interface props {
  fileData: File;
}

export default function UseFileupload({ fileData }: props) {
  const [file, setFile] = useState();
  const [err, setError] = useState("");

  useEffect(() => {
    handleFileupload();
  }, [fileData]);

  const handleFileupload = async () => {
    console.log("calling file upload");
    
    const formData = new FormData();
    formData.append("file", fileData);
    try {
      const { data } = await Client.post("/upload/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response from fileupload", data);
      setFile(data);
    } catch (error: any) {
      console.log("error on fileupload", error);
      setError(error.response.data.message);
    }
  };

  const returnData = [file, err];

  return { returnData };
}
