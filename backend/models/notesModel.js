const mongoose = require("mongoose");

notesModel = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true },
    colour: { type: String, required: true, default: "red" },
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model("Notes", notesModel);

module.exports = Notes;
