import { useState, useCallback } from "react";
import { Button, Col, Form, Input, Row, notification } from "antd";
import app_login from "../../assets/app_login.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./sign.scss";
import { UserOutlined } from "@ant-design/icons";
import { API_ROUTES } from "../../constants/constants";

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [otpStarted, setOtpStarted] = useState(false);
  const [email, setEmail] = useState("");

  const openNotificationWithIcon = useCallback(
    (type, message) => {
      api[type]({
        message: message,
      });
    },
    [api]
  );
  const handleOtp = useCallback(
    async (form) => {
      setLoading(true);
      try {
        if (!otpStarted) {
          await axios.post(API_ROUTES.OTP_LOGIN, form, {
            withCredentials: true,
          });
          setOtpStarted(true);
          setEmail(form.email);
        } else {
          await axios.post(
            API_ROUTES.OTP_VERIFY,
            { email, ...form },
            { withCredentials: true }
          );
          navigate("/");
        }
      } catch (e) {
        console.log(e);
        openNotificationWithIcon("error", "Oops. Something went wrong");
      }
      setLoading(false);
    },
    [navigate, email, otpStarted, openNotificationWithIcon]
  );

  return (
    <div style={{ height: "99vh" }}>
      {contextHolder}
      <Row className="main-row">
        <Col flex="1 1 200px" className="left-container">
          <div className="wrapper">
            <h1 style={{ padding: "2em" }}>Sign In</h1>
            <Form
              name="normal_login"
              className="login-form"
              onFinish={handleOtp}
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
