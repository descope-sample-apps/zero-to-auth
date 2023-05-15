import { Layout, ConfigProvider, Space } from "antd";
import NavBar from "../components/header/NavBar";
import "./projectLayout.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const { Header, Content } = Layout;

const ProjectLayout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
  };

  const location = useLocation();

  if (location.pathname === "/login") {
    return <>{children}</>;
  }
  return (
    <ConfigProvider>
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
    </ConfigProvider>
  );
};

export default ProjectLayout;
