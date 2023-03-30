import { Spin } from "antd";
import Chart from "react-apexcharts";
import { CONST } from "../../constants/constants";

const BarChart = ({ barData = [], isLoading }) => {
  return (
    <>
      {isLoading ? (
        <Spin className="loader" />
      ) : (
        <Chart
          options={CONST.barChartOptions}
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
