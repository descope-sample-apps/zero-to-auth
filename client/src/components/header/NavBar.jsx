import {
  Avatar,
  Breadcrumb,
  Col,
  Divider,
  Popover,
  Row,
  Typography,
} from "antd";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { API_ROUTES } from "../../constants/constants";
import { useCallback } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const logoutUser = useCallback(async () => {
    try {
      await axios.post(API_ROUTES.LOGOUT, null, { withCredentials: true });
    } catch (e) {
      console.log(e);
    }
    navigate("/sign-in");
  }, []);
  const content = (
    <div>
      <Typography.Title level={5}>✨ Hey There</Typography.Title>
      <Divider />
      <p style={{ color: "red", cursor: "pointer" }} onClick={logoutUser}>
        Log out
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
                <Popover content={content} trigger="click" placement="bottom">
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
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default NavBar;
