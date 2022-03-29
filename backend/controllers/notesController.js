const Notes = require("../models/notesModel");

const createNote = async (req, res) => {
  const { title, content, date } = req.body;

  try {
    let note = await Notes.create({
      title,
      content,
      date,
      user: req.user._id,
    });

    res.status(200).json(note);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getNotesOfUser = async (req, res) => {
  try {
    let note = await Notes.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateNote = async (req, res) => {
  let { title, content, date } = req.body;
  try {
    let update = await Notes.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        content: content,
        date: date,
      },
      {
        new: true,
      }
    );

    res.status(200).json(update);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteNote = async (req, res) => {
  try {
    await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getSeletedNote = async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  createNote,
  getNotesOfUser,
  updateNote,
  deleteNote,
  getSeletedNote,
};
