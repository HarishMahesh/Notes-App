const express = require("express");
const {
  createNote,
  getNotesOfUser,
  updateNote,
  deleteNote,
  getSeletedNote,
} = require("../controllers/notesController");
const checkAuthorization = require("../middlewares/checkAuthorization");

const Router = express();

Router.post("/", checkAuthorization, createNote);
Router.get("/", checkAuthorization, getNotesOfUser);
Router.put("/:id", checkAuthorization, updateNote);
Router.delete("/:id", checkAuthorization, deleteNote);
Router.get("/:id", checkAuthorization, getSeletedNote);

module.exports = Router;
