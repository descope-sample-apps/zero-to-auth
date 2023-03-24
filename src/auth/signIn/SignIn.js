import { Button, Col, Form, Input, Row } from "antd";
import app_login from "../../assets/app_login.svg";
import { useNavigate } from "react-router-dom";
import "./sign.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const SignIn = () => {
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    console.log('insidde the submithandler')
    navigate("/admin");
    localStorage.setItem('loggedIn', true);
  };
  return (
    <div style={{ height: "99vh" }}>
      <Row className="main-row">
        <Col flex="1 1 200px" className="left-container">
          <div className="wrapper">
            <h1 style={{ padding: '2em' }}>Sign In</h1>
            <Form
              name="normal_login"
              className="login-form"
              onFinish={submitHandler}
            >
              <Form.Item
                name="username"
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" size="large" />
              </Form.Item>
              <Form.Item
                name="password"
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  size="large"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" size="large">
                  Log in
                </Button>
              </Form.Item>
            </Form>
            {/* <Descope
              flowId={
                process.env.REACT_APP_DESCOPE_SIGN_IN_FLOW_ID || "sign-up-or-in"
              }
              onSuccess={(e) => {
                window.analytics.identify(e.detail.user.userId, {
                  name: e.detail.user.name, //user trait
                  email: e.detail.user.email, //user trait
                });
                navigate("/admin");
                console.log("Logged in!");
              }}
              onError={(e) => console.log("Error!")}
            /> */}
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
