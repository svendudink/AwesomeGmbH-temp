import Abteilung from "../schema/Departments.js";

export const departments = async (req, res) => {
  console.log("test", req.body);

  const abteilung = await Abteilung.find();
  res.status(200).json({
    msg: "All departments",
    abteilung: abteilung,
  });
};
