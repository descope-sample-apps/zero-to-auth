import { useCallback } from "react";
import { Col, Row } from "antd";
import app_login from "../../assets/app_login.svg";
import { useNavigate } from "react-router-dom";
import "./sign.scss";
import { Descope } from "@descope/react-sdk";

const SignIn = () => {
  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div style={{ height: "99vh" }}>
      <Row className="main-row">
        <Col flex="1 1 200px" className="left-container">
          <div style={{ marginTop: 60, marginLeft: 120, width: "95%" }}>
            <h1 style={{ padding: "2em" }}>Sign In</h1>
            <Descope flowId="sign-up-or-in" onSuccess={onSuccess} />
          </div>
        </Col>
        <Col
          flex="0 1 547px"
          className="right-container"
          style={{ width: "41%" }}
        >
          <img src={app_login} alt="app_login" className="img-banner" />
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
