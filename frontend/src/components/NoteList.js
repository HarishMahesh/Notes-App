import React from "react";
import "./NoteList.css";
import { useNavigate } from "react-router-dom";

const NoteList = ({ note, deleteHandeler }) => {
  const navigate = useNavigate();
  let date = new Date(note.date);
  date = date.toDateString();
  return (
    <div className="notes_container">
      <div className="notes_title">
        <h5>{note.title}</h5>
        <i
          style={{ color: "aqua", cursor: "pointer" }}
          class="fas fa-trash-alt"
          onClick={() => deleteHandeler(note._id)}
        ></i>
      </div>
      <hr />
      <div className="notes_content">
        <p>{note.content}</p>
      </div>
      <hr />
      <div className="notes_date">
        <i
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/create/${note._id}`)}
          class="fas fa-pencil-alt"
        ></i>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default NoteList;
