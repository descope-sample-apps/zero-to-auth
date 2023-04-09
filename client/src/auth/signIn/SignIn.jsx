import { useState, useCallback } from "react";
import { Button, Col, Form, Input, Row, notification } from "antd";
import app_login from "../../assets/app_login.svg";
import axios from "axios";
import "./sign.scss";
import { UserOutlined } from "@ant-design/icons";
import { API_ROUTES } from "../../constants/constants";

const SignIn = () => {
  const [loading, setLoading] = useState("");
  const [api, contextHolder] = notification.useNotification();
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
        await axios.post(API_ROUTES.OTP_LOGIN, form, {
          withCredentials: true,
        });
      } catch (e) {
        console.log(e);
        openNotificationWithIcon("error", "Oops. Something went wrong");
      }
      setLoading(false);
    },
    [openNotificationWithIcon]
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
              <Form.Item name="email">
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  size="large"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{ width: "100%" }}
                  loading={loading}
                >
                  {"Login"}
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
