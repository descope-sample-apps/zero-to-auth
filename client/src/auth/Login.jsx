import { useState, useCallback } from "react";
import { Button, Col, Form, Input, Row, Divider, notification } from "antd";
import icecream from "../assets/icecream.jpg";
import "./login.scss";
import { UserOutlined, GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [otpStarted, setOtpStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setEmail] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useCallback(
    (type, message) => {
      api[type]({
        message: message,
      });
    },
    [api]
  );

  const handleOTP = useCallback(
    async (form) => {
      setLoading(true);
      try {
        console.log("handle OTP", form);
        if (!otpStarted) {
          setEmail(form.email);
          setOtpStarted(true);
        } else {
          navigate("/");
        }
      } catch (e) {
        console.log(e);
        openNotificationWithIcon("error", "Oops. Something went wrong");
      }
      setLoading(false);
    },
    [setLoading, setOtpStarted, openNotificationWithIcon, otpStarted, navigate]
  );

  const handleOAuth = useCallback(async () => {
    console.log("handle OAuth");
    navigate("/");
  }, [navigate]);
  return (
    <div style={{ height: "99vh" }}>
      {contextHolder}
      <Row className="main-row">
        <Col flex="1 1 200px" className="left-container">
          <div className="wrapper">
            <h1 style={{ padding: "2em" }}>Login</h1>
            <Form
              name="normal_login"
              className="login-form"
              onFinish={handleOTP}
            >
              {!otpStarted ? (
                <>
                  <Form.Item name="email">
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Email"
                      size="large"
                    />
                  </Form.Item>
                </>
              ) : (
                <>
                  <Form.Item name="code">
                    <Input placeholder="Code" size="large" />
                  </Form.Item>
                </>
              )}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{ width: "100%" }}
                  loading={loading}
                >
                  {otpStarted ? "Enter Code" : "Login"}
                </Button>
              </Form.Item>
            </Form>
            {!otpStarted && (
              <>
                <Divider> OR </Divider>
                <Button
                  htmlType="submit"
                  size="large"
                  style={{ width: "100%" }}
                  disabled={loading}
                  onClick={handleOAuth}
                >
                  <GoogleOutlined />
                  Login With Google
                </Button>
              </>
            )}
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
