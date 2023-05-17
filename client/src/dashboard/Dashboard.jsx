import { Col, Row, Select, Space, notification } from "antd";
import "./dashboard.scss";
import WeeklyIceCream from "./component/WeeklyIceCream";
import PieCard from "./component/PieCard";
import CheckTable from "./component/CheckTable";
import IceCreamPlaces from "./component/IceCreamPlaces";
import { useCallback, useState } from "react";
import axios from "axios";
import { API_ROUTES } from "../constants/constants";
import { getSessionToken } from "@descope/react-sdk";

const Dashboard = () => {
  const [priorityData, setPriorityData] = useState();
  const [revenueProductData, setRevenueProductData] = useState();
  const [barData, setBarData] = useState();
  const [pieData, setPieData] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useCallback(
    (type, message) => {
      api[type]({
        message: message,
      });
    },
    [api]
  );

  const getAPIData = useCallback(
    async (url) => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_ROUTES.BASE_URL}/${url}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${getSessionToken()}`,
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
          openNotificationWithIcon("error", "API Failed: Something went wrong");
          setIsLoading(false);
        }
      } catch (err) {
        openNotificationWithIcon("error", "API Failed: Something went wrong");
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
            label: "My Ice Cream Places",
          },
          {
            value: "bar_chart",
            label: "Weekly Ice Cream Consumption",
          },
          {
            value: "product_data",
            label: "Ice Cream Toppings",
          },
          {
            value: "pie_chart",
            label: "Ice Cream Daily Distribution ",
          },
        ]}
      />
      <Space size="large" className="third-row">
        <Row gutter={[14, 14]}>
          {selectedOption === "priority_data" && (
            <Col sm={24} md={19} lg={15} className="col-one">
              <IceCreamPlaces tableData={priorityData} isLoading={isLoading} />
            </Col>
          )}
          {selectedOption === "bar_chart" && (
            <Col xs={24} sm={12} md={15} className="col-one spin">
              <WeeklyIceCream barData={barData} isLoading={isLoading} />
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
