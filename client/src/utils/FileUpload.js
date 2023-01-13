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
    data.append("token", localStorage.getItem("token"));

    await axios({
      method: "POST",
      url: "http://localhost:8080/upload",
      data: data,
    }).then((res) => {
      alert(res.msg);
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
