export const CheckIfCompatible = async (json, filterSetting) => {
  const count = Object.keys(json[0]).filter((el) => {
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
