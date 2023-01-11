import fs from "fs";
import xlsx from "node-xlsx";
import csvtojsonV2 from "csvtojson";

export const xlsxAndCsvToObj = (path) => {
  return new Promise((resolve, reject) => {
    try {
      path = path.toLowerCase();

      if (("check", path.substr(path.length - 4) === "xlsx")) {
        let jsonObj = [];
        xlsConvert(path);
        path = path.replace(".xlsx", ".csv");

        console.log("path", path);
      }
      csvtojsonV2()
        .fromFile(path)
        .then((jsonObj) => {
          console.log("jsonobj", jsonObj);
          resolve(jsonObj);
        });
    } catch {
      console.log("toJSONerror");
    }
  });
};

const xlsConvert = (path) => {
  try {
    console.log("checkthispath", path);
    let obj = xlsx.parse(path);
    let rows = [];
    let writeStr = "";

    for (let i = 0; i < obj.length; i++) {
      let sheet = obj[i];

      for (let j = 0; j < sheet["data"].length; j++) {
        rows.push(sheet["data"][j]);
      }
    }

    for (let i = 0; i < rows.length; i++) {
      writeStr += rows[i].join(",") + "\n";
    }

    fs.writeFile(path.replace(".xlsx", ".csv"), writeStr, function (err) {
      if (err) {
        return console.log("XLSConvert", err);
      }
    });
    return null;
  } catch {
    console.log("Failed to convert XLSX to CSV");
  }
};
