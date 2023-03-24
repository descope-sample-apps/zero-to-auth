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
import { Link, useLocation, useNavigate } from "react-router-dom";
import InfoPopover from "../popupScreens/InfoPopover";
import NotificationPopover from "../popupScreens/NotificationPopover";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { useToken } = theme;
  const { token } = useToken();
  const location = useLocation();
  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const logoutUser = () => {
    console.log('logout user')
    localStorage.removeItem('loggedIn');
    navigate("/auth/sign-in");
  }
  const content = (
    <div>
      <Typography.Title level={5}>
        👏 Hey, Profile Name
      </Typography.Title>
      <Divider />
      <Link>
        <p
          style={{ color: "red" }}
          onClick={logoutUser}
        >
          Log out
        </p>
      </Link>
    </div>
  );

  return (
    <section>
      <div
        className="header-section"
      >
        <Row className="header-row">
          <Col span={8} className="header-col">
            <div>
              <Link to="admin">
                <Breadcrumb style={{ color: token.colorTextBase }}>
                  <Breadcrumb.Item>Pages</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    {location.state == null
                      ? "Your Rev Dashboard"
                      : location.state}
                  </Breadcrumb.Item>
                </Breadcrumb>
              </Link>
            </div>
            <div>
              <Typography className="menu-text">
                {location.state == null ? "Your Rev Dashboard" : location.state}
              </Typography>
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
                    <UserOutlined/>
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
