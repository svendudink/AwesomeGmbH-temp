import mongoose from "mongoose";

const abteilungSchema = new mongoose.Schema({
  abteilung: {
    type: String,
    required: true,
  },
});

const Abteilung = mongoose.model("Abteilung", abteilungSchema);

export default Abteilung;
