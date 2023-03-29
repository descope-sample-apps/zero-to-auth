import { Spin } from "antd";
import { useState } from "react";
import Chart from "react-apexcharts";

const BarChart = ({ barData = [], isLoading }) => {
  const [state] = useState({
    chartOptions: {
      chart: {
        stacked: true,
        toolbar: {
          show: false,
          style: {
            width: "100%",
          },
        },
      },
      tooltip: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
        onDatasetHover: {
          style: {
            fontSize: "12px",
            fontFamily: undefined,
          },
        },
        theme: "dark",
      },
      xaxis: {
        categories: ["17", "18", "19", "20", "21", "22", "23", "24", "25"],
        show: false,
        labels: {
          show: true,
          style: {
            colors: "#A3AED0",
            fontSize: "14px",
            fontWeight: "500",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        color: "black",
        labels: {
          show: false,
          style: {
            colors: "#A3AED0",
            fontSize: "14px",
            fontWeight: "500",
          },
        },
      },

      grid: {
        borderColor: "rgba(163, 174, 208, 0.3)",
        show: true,
        yaxis: {
          lines: {
            show: false,
            opacity: 0.5,
          },
        },
        row: {
          opacity: 0.5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      fill: {
        type: "solid",
        colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
      },
      legend: {
        show: false,
      },
      colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "20px",
        },
      },
    },
  });

  return (
    <>
      {isLoading ? (
        <Spin className="loader" />
      ) : (
        <Chart
          options={state.chartOptions}
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
