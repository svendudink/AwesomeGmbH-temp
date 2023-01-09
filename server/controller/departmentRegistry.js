import Departments from "../schema/Departments.js";

export const departments = async (req, res) => {
  console.log("test", req.body);

  const departments = await Departments.find();
  res.status(200).json({
    msg: "All departments",
    Abteilung: departments,
  });
};
