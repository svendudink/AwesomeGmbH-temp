import { useState, useContext } from "react";
import axios from "axios";
import { ApiContext } from "../context/ApiContext";

function FileUpload() {
  const { ApiCall } = useContext(ApiContext);
  const [fileData, setFileData] = useState("");
  const getFile = (e) => {
    setFileData(e.target.files[0]);
  };

  const uploadFile = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const data = new FormData();
    data.append("file", fileData);
    data.append("token", localStorage.getItem("token"));

    await axios({
      method: "POST",
      url: "http://localhost:8080/upload",
      data: data,
    }).then((res) => {
      if (res.data.error) {
        uploadFile();
      } else {
        alert(res.data.msg);
        ApiCall("employeeList");
        ApiCall("departments");
      }
    });
  };

  return (
    <form onSubmit={uploadFile}>
      <input
        type="file"
        accept=".xlsx,.csv"
        name="file"
        onChange={getFile}
        required
      />
      Accepted files, .CSV and .XLSX
      <input type="submit" name="upload" value="Upload" />
    </form>
  );
}

export default FileUpload;
