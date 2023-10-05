import { Col, Row, Select, Space, notification } from "antd";
import "./dashboard.scss";
import WeeklyRevenu from "./component/WeeklyRevenu";
import PieCard from "./component/PieCard";
import CheckTable from "./component/CheckTable";
import PriorityDeals from "./component/PriorityDeals";
import { useCallback, useState } from "react";
import axios from "axios";
import { API_ROUTES } from "../constants/constants";
import {
  getRefreshToken,
  getSessionToken,
  useDescope,
  useSession,
} from "@descope/react-sdk";

const Dashboard = () => {
  const [priorityData, setPriorityData] = useState();
  const [revenueProductData, setRevenueProductData] = useState();
  const [barData, setBarData] = useState();
  const [pieData, setPieData] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const sdk = useDescope();
  const { sessionToken } = useSession();

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
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`, // can use getSessionToken() to get session token as well
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
    [openNotificationWithIcon, sessionToken]
  );

  const onChange = (e) => {
    getAPIData(e);
    setSelectedOption(e);
  };

  const updateJwt = useCallback(async () => {
    const refreshToken = getRefreshToken();
    try {
      const response = await axios.post(
        `${API_ROUTES.BASE_URL}/update_jwt`,
        {
          refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`, // can use getSessionToken() to get session token as well
          },
        }
      );
      const { status, data } = response;
      if (status === 200) {
        console.log("@@@ update jwt res", data);
        const { jwt } = data;
        localStorage.setItem("DSR", jwt);
        openNotificationWithIcon("success", "JWT Updated");
        const res = await sdk.refresh();
        console.log("@@@ refresh res", res);
      } else {
        openNotificationWithIcon("error", "JWT Update Failed");
      }
    } catch (err) {
      openNotificationWithIcon("error", "JWT Update Failed");
    }
  }, [sdk, sessionToken]);
  return (
    <div className="dashboard_wrapper">
      {contextHolder}
      <button onClick={updateJwt}> Update JWT</button>
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
