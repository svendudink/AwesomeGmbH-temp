/////////////////////////////////////////Sven's//Coding////////////////////////////////
// Import all deparrtment
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

// imports
import Abteilung from "../schema/Departments.js";

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
