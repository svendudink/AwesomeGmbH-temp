import Abteilung from "../schema/Departments.js";

/////////////////////////////////////////Sven's//Coding////////////////////////////////
// sends back all querys from MongoDB as repsonse, or if req.internal is set, repsonse is
// an oject
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

export const departments = async (req, res) => {
  const abteilung = await Abteilung.find();

  if (req.internal) {
    return abteilung;
  } else {
    res.status(200).json({
      abteilung: abteilung,
    });
  }
};
