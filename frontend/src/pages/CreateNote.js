import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

const CreateNote = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);

  const getDetails = async (token) => {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      let { data } = await axios.get(`/api/notes/${params.id}`, config);
      setTitle(data.title);
      setContent(data.content);
      setDate(data.date.slice(0, 10));
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    let userinfo = localStorage.getItem("user");
    userinfo = JSON.parse(userinfo);
    if (userinfo) {
      setUser(userinfo);
      if (params.id) {
        getDetails(userinfo.token);
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  const createNoteHandeler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      if (params.id) {
        let { data } = await axios.put(
          `/api/notes/${params.id}`,
          {
            title,
            content,
            date,
          },
          config
        );
      } else {
        let { data } = await axios.post(
          "/api/notes/",
          {
            title,
            content,
            date,
          },
          config
        );
      }
      setLoading(false);
      navigate("/home");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      {user && (
        <>
          <Header name={user.name} />

          <Container>
            <Row>
              <Col md={{ span: 6, offset: 3 }} style={{ marginTop: "30px" }}>
                <form
                  className="login_form_container"
                  onSubmit={createNoteHandeler}
                >
                  <h4 style={{ color: "whitesmoke" }}>
                    {params.id ? "UPDATE NOTE" : "CREATE NOTE"}
                  </h4>
                  <div className="login_input_container">
                    <label htmlFor="title">
                      <b>Title</b>
                    </label>
                    <br />
                    <input
                      id="title"
                      type="text"
                      placeholder="Title"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></input>
                  </div>
                  <div className="login_input_container">
                    <label htmlFor="content">
                      <b>Content</b>
                    </label>
                    <br />
                    <textarea
                      id="content"
                      placeholder="Type your notes here"
                      required
                      rows="8"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="login_input_container">
                    <label htmlFor="date">
                      <b>Date</b>
                    </label>
                    <br />
                    <input
                      id="date"
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <Button
                      style={{ width: "100%", marginTop: "10px" }}
                      variant="light"
                      disabled={loading}
                      type="submit"
                    >
                      {loading ? (
                        <Spinner animation="border" size="sm" />
                      ) : params.id ? (
                        "Update Note"
                      ) : (
                        "Create Note"
                      )}
                    </Button>
                  </div>
                </form>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default CreateNote;
