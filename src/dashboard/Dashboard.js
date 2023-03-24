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
import { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [priorityData, setPriorityData] = useState();
  const [revenueProductData, setRevenueProductData] = useState();
  const [barData, setBarData] = useState();
  const [pieData, setPieData] = useState();
  const [selectedOption, setSelectedOption] = useState();

  const getAPIData = async (url) => {
    try {
      const response = await axios.get("http://localhost:8080/" + url);
      const data = response.data;
      if (url === "priority_data") {
        setPriorityData(data);
      }
      if (url === "bar_chart") {
        console.log('in the if of bar data')
        setBarData(data);
      }
      if (url === "product_data") {
        setRevenueProductData(data);
      }
      if (url === "pi_chart") {
        setPieData(data);
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
          {
            selectedOption === 'priority_data' &&
            <Col sm={24} md={24} lg={12} className="col-one">

              <PriorityDeals
                columnsData={columnsDataComplex}
                tableData={priorityData}
              />

            </Col>
          }
          {
            selectedOption === 'bar_chart' &&
            <Col xs={24} sm={12}>
              <WeeklyRevenu barData={barData} />
            </Col>
          }
        </Row>
      </Space>
      <Space size="middle" className="forth-row">
        <Row className="forth-row-container" gutter={[14, 14]}>
          {
            selectedOption === 'product_data' &&
            <Col sm={24} md={24} lg={12} className="col-one">
              <CheckTable
                columnsDataCheck={columnsDataCheck}
                tableDataCheck={revenueProductData}
              />
            </Col>
          }
          {
            selectedOption === 'pi_chart' &&
            <Col sm={24} md={24} lg={12} className="space-chart">
              <PieCard className="container" pieData={pieData} />
            </Col>
          }

        </Row>
      </Space>
    </div>
  );
};

export default Dashboard;
