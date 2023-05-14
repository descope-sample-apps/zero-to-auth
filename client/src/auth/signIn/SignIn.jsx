import { useCallback } from "react";
import { Row } from "antd";
import { useNavigate } from "react-router-dom";
import { Descope } from "@descope/react-sdk";
import "./sign.scss";

const SignIn = () => {
  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div style={{ height: "99vh" }}>
      <Row className="main-row">
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Descope flowId="sign-up-or-in" onSuccess={onSuccess} />
        </div>
      </Row>
    </div>
  );
};

export default SignIn;
