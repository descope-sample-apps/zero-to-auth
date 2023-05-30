import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Popover,
  Row,
  Typography,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";

//
const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    // do the actual logout
    navigate("/login");
  }, [navigate]);

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
                    { title: "IScream" },
                  ]}
                />
              </Link>
            </div>
            <div>
              <Typography className="menu-text">
                IScream for Ice Cream
              </Typography>
            </div>
          </Col>
          <Col span={2}>
            <div className="search-section">
              <div className="avtar">
                <Popover
                  content={
                    <div>
                      <Typography.Title level={5}>
                        ✨ Hey There
                      </Typography.Title>
                      {/* Logout text button */}
                    </div>
                  }
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
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default NavBar;
