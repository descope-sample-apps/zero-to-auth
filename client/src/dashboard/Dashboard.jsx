import { Col, Row, Select, Space, notification } from "antd";
import "./dashboard.scss";
import WeeklyRevenu from "./component/WeeklyRevenu";
import PieCard from "./component/PieCard";
import CheckTable from "./component/CheckTable";
import PriorityDeals from "./component/PriorityDeals";
import { useCallback, useState } from "react";
import axios from "axios";
import { API_ROUTES } from "../constants/constants";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [priorityData, setPriorityData] = useState();
  const [revenueProductData, setRevenueProductData] = useState();
  const [barData, setBarData] = useState();
  const [pieData, setPieData] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotificationWithIcon = useCallback(
    (type, message) => {
      api[type]({
        message: message,
        duration: 1.5,
        onClose: redirectToLogin,
        onClick: redirectToLogin,
      });
    },
    [api]
  );

  const redirectToLogin = useCallback(async () => {
    navigate("/sign-in");
  }, [navigate]);

  const getAPIData = useCallback(
    async (url) => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_ROUTES.BASE_URL}/${url}`, {
          headers: {
            Authorization: `Bearer`,
          },
        });
        const { status, data } = response;
        if (status === 200) {
          switch (url) {
            case "priority_data":
              setPriorityData(data);
              break;
            case "bar_chart":
              setBarData(data);
              break;
            case "product_data":
              setRevenueProductData(data);
              break;
            case "pie_chart":
              setPieData(data);
              break;
            default:
              break;
          }
          setIsLoading(false);
        } else {
          openNotificationWithIcon(
            "error",
            "Unauthorized. Redirecting to Sign In Page..."
          );
          setIsLoading(false);
        }
      } catch (err) {
        openNotificationWithIcon(
          "error",
          "Unauthorized. Redirecting to Sign In Page..."
        );
        setIsLoading(false);
      }
    },
    [openNotificationWithIcon]
  );

  const onChange = (e) => {
    getAPIData(e);
    setSelectedOption(e);
  };

  return (
    <div className="dashboard_wrapper">
      {contextHolder}
      <Select
        placeholder="Select ..."
        optionFilterProp="children"
        onChange={onChange}
        size="large"
        options={[
          {
            value: "priority_data",
            label: "Priority Deals",
          },
          {
            value: "bar_chart",
            label: "Weekly Revenue",
          },
          {
            value: "product_data",
            label: "Revenue By Product",
          },
          {
            value: "pie_chart",
            label: "Market Breakdown",
          },
        ]}
      />
      <Space size="large" className="third-row">
        <Row gutter={[14, 14]}>
          {selectedOption === "priority_data" && (
            <Col sm={24} md={19} lg={15} className="col-one">
              <PriorityDeals tableData={priorityData} isLoading={isLoading} />
            </Col>
          )}
          {selectedOption === "bar_chart" && (
            <Col xs={24} sm={12} md={15} className="col-one spin">
              <WeeklyRevenu barData={barData} isLoading={isLoading} />
            </Col>
          )}
        </Row>
      </Space>
      <Space size="middle" className="forth-row">
        <Row className="forth-row-container" gutter={[14, 14]}>
          {selectedOption === "product_data" && (
            <Col sm={24} md={19} lg={15} className="col-one">
              <CheckTable
                tableDataCheck={revenueProductData}
                isLoading={isLoading}
              />
            </Col>
          )}
          {selectedOption === "pie_chart" && (
            <Col sm={24} md={19} lg={15} className="space-chart">
              <PieCard
                className="container"
                pieData={pieData}
                isLoading={isLoading}
              />
            </Col>
          )}
        </Row>
      </Space>
    </div>
  );
};

export default Dashboard;
