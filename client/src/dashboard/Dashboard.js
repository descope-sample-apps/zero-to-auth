import { Col, Row, Select, Space } from "antd";
import "./dashboard.scss";
import WeeklyRevenu from "./component/WeeklyRevenu";
import PieCard from "./component/PieCard";
import CheckTable from "./component/CheckTable";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "../dashboard/variables/ColumnsData";
import PriorityDeals from "./component/PriorityDeals";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [priorityData, setPriorityData] = useState();
  const [revenueProductData, setRevenueProductData] = useState();
  const [barData, setBarData] = useState();
  const [pieData, setPieData] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("loggedIn") == null) {
      navigate("/auth/sign-in");
    } else {
      navigate("/admin");
    }
  }, []);
  const getAPIData = async (url) => {
    try {
      const response = await axios.get("http://localhost:8080/" + url);
      const data = response.data;
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
        case "pi_chart":
          setPieData(data);
          break;

        default:
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onChange = (e) => {
    getAPIData(e);
    setSelectedOption(e);
  };

  return (
    <div className="dashboard_wrapper">
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
            value: "pi_chart",
            label: "Market Breakdown",
          },
        ]}
      />
      <Space size="large" className="third-row">
        <Row gutter={[14, 14]}>
          {selectedOption === "priority_data" && (
            <Col sm={24} md={19} lg={15} className="col-one">
              <PriorityDeals
                columnsData={columnsDataComplex}
                tableData={priorityData}
              />
            </Col>
          )}
          {selectedOption === "bar_chart" && (
            <Col xs={24} sm={12} md={15} className="col-one">
              <WeeklyRevenu barData={barData} />
            </Col>
          )}
        </Row>
      </Space>
      <Space size="middle" className="forth-row">
        <Row className="forth-row-container" gutter={[14, 14]}>
          {selectedOption === "product_data" && (
            <Col sm={24} md={19} lg={15} className="col-one">
              <CheckTable
                columnsDataCheck={columnsDataCheck}
                tableDataCheck={revenueProductData}
              />
            </Col>
          )}
          {selectedOption === "pi_chart" && (
            <Col sm={24} md={19} lg={15} className="space-chart">
              <PieCard className="container" pieData={pieData} />
            </Col>
          )}
        </Row>
      </Space>
    </div>
  );
};

export default Dashboard;
