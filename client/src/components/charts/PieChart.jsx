import { Spin } from "antd";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { PIE_CHART_OPTIONS } from "../../constants/constants";

const PieChart = ({ pieData = [], isLoading }) => {
  return (
    <>
      {isLoading ? (
        <Spin className="loader" />
      ) : (
        <ReactApexChart
          options={PIE_CHART_OPTIONS}
          series={pieData}
          type="pie"
          width="100%"
          height="100%"
        />
      )}
    </>
  );
};

export default PieChart;
