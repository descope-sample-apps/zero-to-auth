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
import { useCallback, useState } from "react";
import { useDescope, useUser, useSession, Descope } from "@descope/react-sdk";

// Top NavBar component
const NavBar = () => {
  const navigate = useNavigate();
  const { logout } = useDescope();
  const { isAuthenticated, isSessionLoading } = useSession();
  const { user, isUserLoading } = useUser();
  const [samlSettingsClick, setSamlSettingsClick] = useState();

  const handleLogout = useCallback(() => {
    // do the actual logout
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const handleSamlSettingsClick = useCallback(() => {
    setSamlSettingsClick(!samlSettingsClick);
  }, [setSamlSettingsClick, samlSettingsClick]);

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
            {!isSessionLoading && (
              <>
                {isAuthenticated && !isUserLoading && (
                  <p className="user-name">Hello, {user?.name}</p>
                )}
                <div className="search-section">
                  {isAuthenticated ? (
                    <>
                      <div className="avtar">
                        <Popover
                          content={
                            <div>
                              <Typography.Title level={5}>
                                ✨ Hey There
                              </Typography.Title>
                              {/* Logout text button */}
                              {isAuthenticated && (
                                <Button type="text" onClick={handleLogout}>
                                  Logout
                                </Button>
                              )}
                              {isAuthenticated && (
                                <Button
                                  type="text"
                                  onClick={handleSamlSettingsClick}
                                >
                                  SAML Settings
                                </Button>
                              )}
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
                    </>
                  ) : (
                    <a href="/login">Sign In</a>
                  )}
                </div>
              </>
            )}
          </Col>
        </Row>
      </div>
      {isAuthenticated && samlSettingsClick && (
        <div className="saml-settings">
          <Descope flowId="saml-config" onSuccess={() => {}} />
        </div>
      )}
    </section>
  );
};

export default NavBar;
