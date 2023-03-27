import { Divider, Menu } from "antd";
import logo_Dolrr from "../../assets/logo_dolrr.svg";
import { useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { MdHome } from "react-icons/md";

const getItem = (label, key, icon) => {
  return {
    key,
    icon,
    label,
  };
};
const items = [
  getItem(
    "Your Rev Dashboard",
    "/admin",
    <MdHome style={{ fontSize: "1.2em" }} />
  ),
];

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <section className="sidebar-container">
      <div>
        <img src={logo_Dolrr} alt="dolrr-logo" className="img-dolrr" />
      </div>
      <Divider className="divider" />
      <Menu
        onClick={({ key }) => {
          navigate(key, { state: items.find((elm) => elm.key === key).label });
        }}
        defaultSelectedKeys={["/admin"]}
        items={items}
      />
    </section>
  );
};

export default Sidebar;
