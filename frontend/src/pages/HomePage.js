import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NoteList from "../components/NoteList";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchagain, setFetchagain] = useState(false);

  useEffect(() => {
    let userinfo = localStorage.getItem("user");
    userinfo = JSON.parse(userinfo);
    if (!userinfo) {
      navigate("/");
    }
    setUser(userinfo);
  }, []);

  const getNotes = async (token) => {
    setLoading(true);
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let { data } = await axios.get("/api/notes/", config);
      setLoading(false);
      console.log(data);
      setNotes(data);
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  const deleteHandeler = async (id) => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(`/api/notes/${id}`, config);
      setFetchagain((fetchagain) => !fetchagain);
    } catch (error) {
      alert(error.response.data.message);
      setFetchagain((fetchagain) => !fetchagain);
    }
  };

  useEffect(() => {
    if (user) {
      getNotes(user.token);
    }
  }, [user, fetchagain]);

  return (
    <>
      {user && <Header name={user.name} />}
      {loading && (
        <Spinner
          style={{
            color: "white",
            marginTop: "20px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
          }}
          animation="border"
        />
      )}

      <Container>
        <Row style={{ marginTop: "20px" }}>
          {notes && !loading && notes.length > 0 ? (
            notes.map((n) => (
              <Col
                style={{ marginTop: "15px" }}
                key={n._id}
                md={6}
                sm={12}
                lg={3}
              >
                <NoteList note={n} deleteHandeler={deleteHandeler} />
              </Col>
            ))
          ) : (
            <Alert variant="warning">No Notes available</Alert>
          )}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
