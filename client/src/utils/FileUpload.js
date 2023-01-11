import { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [fileData, setFileData] = useState("");
  const getFile = (e) => {
    setFileData(e.target.files[0]);
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", fileData);

    await axios({
      method: "POST",
      url: "http://localhost:8080/upload",
      data: data,
      body: JSON.stringify(localStorage.getItem("token")),
    }).then((res) => {
      alert(res.data.message);
    });
  };

  return (
    <form onSubmit={uploadFile}>
      <input type="file" name="file" onChange={getFile} required />
      <input type="submit" name="upload" value="Upload" />
    </form>
  );
}

export default FileUpload;
