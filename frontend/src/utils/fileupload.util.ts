import Client from "../utils/axiosinstance.util";

export const handleFileupload = (fileData: File) => {
  console.log("calling file upload");
  return new Promise(async (resolve,reject) => {
      const formData = new FormData();
      formData.append("file", fileData);
      try {
        const { data } = await Client.post("/upload/file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("response from fileupload", data);
        resolve(data.url);
      } catch (error: any) {
        console.log("error on fileupload", error);
        reject(error.response.data.message);
      }
  })
};
