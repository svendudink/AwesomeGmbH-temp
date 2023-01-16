/////////////////////////////////////////Sven's//Coding////////////////////////////////
// File uploader
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

// imports
import { useState, useContext } from "react";
import axios from "axios";
import { ApiContext } from "../context/ApiContext";
import { Input } from "@mui/material";
import { websiteColor } from "../config/config";

function FileUpload() {
  const { ApiCall } = useContext(ApiContext);
  const [fileData, setFileData] = useState("");
  const getFile = (e) => {
    setFileData(e.target.files[0]);
  };

  // Upload file and append with token
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
    <div
      style={{
        position: "obsolute",
        textAlign: "center",
        height: "100px",
        width: "300px",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        margin: "auto",
        marginTop: "5px",
        paddingTop: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        border: `solid 2px ${websiteColor}`,
        borderRadius: "10px",
      }}
    >
      <form onSubmit={uploadFile}>
        <Input
          type="file"
          accept=".xlsx,.csv"
          name="file"
          onChange={getFile}
          required
        />
        <br />
        Accepted files, .CSV and .XLSX
        <br />
        <input type="submit" name="upload" value="Upload" />
      </form>
    </div>
  );
}

export default FileUpload;
