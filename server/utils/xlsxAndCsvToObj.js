/////////////////////////////////////////Sven's//Coding////////////////////////////////
// Convert XLS or CSV to an object
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

// imports
import fs from "fs";
import xlsx from "node-xlsx";
import csvtojsonV2 from "csvtojson";

export const xlsxAndCsvToObj = (path) => {
  console.log(path);
  return new Promise((resolve, reject) => {
    try {
      path = path.toLowerCase();

      if (("check", path.substr(path.length - 4) === "xlsx")) {
        let jsonObj = [];
        console.log(path);
        xlsConvert(`uploads/${path}`);
        path = path.replace(".xlsx", ".csv");
      }
      resolve(
        csvtojsonV2()
          .fromFile(`uploads/${path}`)
          .then((jsonObj) => {
            return jsonObj;
          })
      );
    } catch {
      reject("something went wrong");
    }
  });
};

const XLStoObj = (path) => {
  console.log("find error here", path);
  return xlsx.parse(path);
};

const xlsConvert = (path) => {
  try {
    let obj = XLStoObj(path);

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
    console.log("Failed");
  }
};
