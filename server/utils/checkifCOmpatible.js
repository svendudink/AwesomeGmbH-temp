export const CheckIfCompatible = async (json, filterSetting) => {
  console.log("hippietesrt", json);
  const count = Object.keys(json[0]).filter((el) => {
    console.log("whatis", el);
    return (
      "Vorname" === el ||
      "Nachname" === el ||
      "Strasse" === el ||
      "Nr" === el ||
      "PLZ" === el ||
      "Ort" === el ||
      "Land" === el ||
      "Abteilung" === el ||
      "Position" === el
    );
  });
  console.log(
    count,
    "checkuplength",
    count.length,
    filterSetting,
    count.length >= filterSetting ? true : false
  );
  return count.length <= filterSetting ? true : false;
};
