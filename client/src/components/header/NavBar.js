import {
  Avatar,
  Breadcrumb,
  Col,
  Divider,
  Drawer,
  Popover,
  Row,
  theme,
  Typography,
} from "antd";
import { useState } from "react";

import Sidebar from "../sidebar/Sidebar";
import {
  SearchOutlined,
  BellOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { GiHamburgerMenu } from "react-icons/gi";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import InfoPopover from "../popupScreens/InfoPopover";
import NotificationPopover from "../popupScreens/NotificationPopover";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { useToken } = theme;
  const { token } = useToken();
  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const logoutUser = () => {
    navigate("/auth/sign-in");
    localStorage.clear();
  };
  const content = (
    <div>
      <Typography.Title level={5}>👏 Hey, Profile Name</Typography.Title>
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
                <Breadcrumb style={{ color: token.colorTextBase }}>
                  <Breadcrumb.Item>Pages</Breadcrumb.Item>
                  <Breadcrumb.Item>Your Rev Dashboard</Breadcrumb.Item>
                </Breadcrumb>
              </Link>
            </div>
            <div>
              <Typography className="menu-text">Your Rev Dashboard</Typography>
            </div>
          </Col>
          <Col span={8}>
            <div
              className="search-section"
              style={{ background: token.colorBgContainer }}
            >
              <div className="">
                <div className="search-icon">
                  <SearchOutlined style={{ color: "#0b0d10" }} />
                </div>
                <input
                  placeholder="Search..."
                  className="search-input"
                  style={{ background: token.colorPrimaryBg }}
                />
              </div>
              <div className="ham-icon">
                <GiHamburgerMenu
                  onClick={showDrawer}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="bell-icon">
                <Popover
                  content={<NotificationPopover />}
                  trigger="click"
                  className="popover"
                  placement="bottom"
                >
                  <BellOutlined style={{ color: "#a3aed0" }} />
                </Popover>
              </div>
              <div className="info-icon">
                <Popover
                  content={<InfoPopover />}
                  trigger="click"
                  placement="bottom"
                >
                  <InfoCircleOutlined style={{ color: "#a3aed0" }} />
                </Popover>
              </div>
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
      <div className="side-drawer">
        <Drawer
          placement="left"
          closable={true}
          onClose={onClose}
          open={open}
          width={285}
        >
          <Sidebar />
        </Drawer>
      </div>
    </section>
  );
};

export default NavBar;
