import {
  Avatar,
  Breadcrumb,
  Col,
  Divider,
  Popover,
  Row,
  Typography,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDescope, useSession } from "@descope/react-sdk";

const NavBar = () => {
  const navigate = useNavigate();

  const { logout } = useDescope();
  const { isAuthenticated } = useSession();

  const logoutUser = useCallback(async () => {
    try {
      await logout();
    } catch (e) {
      console.log(e);
    }
    navigate("/sign-in");
  }, [navigate]);

  const loginUser = useCallback(async () => {
    navigate("/sign-in");
  }, [navigate]);

  const logout_popover = (
    <div>
      <Typography.Title level={5}>✨ Hey There</Typography.Title>
      <Divider />
      <p style={{ color: "red", cursor: "pointer" }} onClick={logoutUser}>
        Log out
      </p>
    </div>
  );

  const login_popover = (
    <div>
      <Typography.Title level={5}>✨ Hey There</Typography.Title>
      <Divider />
      <p style={{ color: "green", cursor: "pointer" }} onClick={loginUser}>
        Log in
      </p>
    </div>
  );

  return (
    <section>
      <div className="header-section">
        <Row className="header-row">
          <Col span={8} className="header-col">
            <div>
              <Link to="admin">
                <Breadcrumb
                  items={[
                    {
                      title: "Pages",
                    },
                    { title: "Your Rev Dashboard" },
                  ]}
                />
              </Link>
            </div>
            <div>
              <Typography className="menu-text">Your Rev Dashboard</Typography>
            </div>
          </Col>
          <Col span={2}>
            <div className="search-section">
              <div className="avtar">
                {!isAuthenticated && (
                  <Popover
                    content={login_popover}
                    trigger="click"
                    placement="bottom"
                  >
                    <Avatar
                      style={{
                        backgroundColor: "#11047a",
                        verticalAlign: "middle",
                        cursor: "pointer",
                      }}
                      size="large"
                    >
                      <UserOutlined />
                    </Avatar>
                  </Popover>
                )}
                {isAuthenticated && (
                  <Popover
                    content={logout_popover}
                    trigger="click"
                    placement="bottom"
                  >
                    <Avatar
                      style={{
                        backgroundColor: "#11047a",
                        verticalAlign: "middle",
                        cursor: "pointer",
                      }}
                      size="large"
                    >
                      <UserOutlined />
                    </Avatar>
                  </Popover>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default NavBar;
