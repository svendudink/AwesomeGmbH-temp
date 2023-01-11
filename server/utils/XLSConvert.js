const xlsConvert = (path) => {
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
};

export default xlsConvert;
