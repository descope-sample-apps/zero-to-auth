import { Layout, ConfigProvider, Space } from "antd";
import NavBar from "../components/header/NavBar";
import "./projectLayout.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../auth/signIn/SignIn";

const { Header, Content } = Layout;

const ProjectLayout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
  };
  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      navigate("/auth/sign-in");
    } else {
      navigate("/admin");
    }
  }, [navigate]);
  return (
    <ConfigProvider>
      {!localStorage.getItem("loggedIn") ? (
        <SignIn />
      ) : (
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
          size={[0, 50]}
        >
          <Layout>
            <Layout>
              <Header className="header-style">
                <NavBar handleClick={handleClick} />
              </Header>
              <Content className="content-style">{children}</Content>
            </Layout>
          </Layout>
        </Space>
      )}
    </ConfigProvider>
  );
};

export default ProjectLayout;
