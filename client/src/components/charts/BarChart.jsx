import { Spin } from "antd";
import Chart from "react-apexcharts";
import { BAR_CHART_OPTIONS } from "../../constants/constants";

const BarChart = ({ barData = [], isLoading }) => {
  return (
    <>
      {isLoading ? (
        <Spin className="loader" />
      ) : (
        <Chart
          options={BAR_CHART_OPTIONS}
          series={barData}
          type="bar"
          width="100%"
          height="100%"
        />
      )}
    </>
  );
};

export default BarChart;
