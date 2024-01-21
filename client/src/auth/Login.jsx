import { useCallback } from "react";
import { Col, Row } from "antd";
import icecream from "../assets/icecream.jpg";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { Descope } from "@descope/react-sdk";

// Login component - Descope flow id: sign-up-or-in
const Login = () => {
  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div style={{ height: "99vh" }}>
      <Row className="main-row">
        <Col flex="1 1 200px" className="left-container">
          <div
            className="wrapper"
            style={{
              paddingTop: "12em",
              paddingRight: "20em",
              paddingLeft: "20em",
            }}
          >
            {/* Login component */}
            <Descope flowId="sso-login" onSuccess={onSuccess} />
          </div>
        </Col>
        <Col
          flex="0 1 547px"
          className="right-container"
          style={{ width: "41%" }}
        >
          <img src={icecream} alt="icecream" className="img-banner" />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
