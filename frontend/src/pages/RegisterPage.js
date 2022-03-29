import React, { useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState();

  const registerHandeler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErr();
    try {
      let { data } = await axios.post("api/users/register", {
        name,
        email,
        password,
      });

      setLoading(false);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/home");
    } catch (error) {
      setLoading(false);
      setErr(error.response.data.message);
    }
  };
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="login_container">
          <form className="login_form_container" onSubmit={registerHandeler}>
            <div className="login_input_container">
              <label htmlFor="name">
                <b>Name</b>
              </label>
              <br />
              <input
                id="name"
                type="text"
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="login_input_container">
              <label htmlFor="email">
                <b>Email</b>
              </label>
              <br />
              <input
                id="email"
                type="text"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="login_input_container">
              <label htmlFor="password">
                <b>Password</b>
              </label>
              <br />
              <input
                id="password"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            {err ? <p className="login_err_msg">{err}</p> : ""}
            <div className="login_btn_container">
              <Button variant="primary" disabled={loading} type="submit">
                {loading ? <Spinner animation="border" size="sm" /> : "Login"}
              </Button>
            </div>
            <p>
              Existing user? <b onClick={() => navigate("/")}>Register</b>
            </p>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
