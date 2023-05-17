import { Progress } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleFilled,
} from "@ant-design/icons";

export const REV_PRODUCT_COLUMNS = [
  {
    title: "TOPPING",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "TIMES ORDERED",
    dataIndex: "progress",
    render: (progress) => <Progress percent={progress} status="active" />,
    key: "progress",
  },
  {
    title: "COST PER SCOOP",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "LAST ORDERED",
    dataIndex: "date",
    key: "date",
  },
];

export const PRIORITIZED_DEALS_COLUMNS = [
  {
    title: "NAME",
    dataIndex: "iceCreamPlace",
    key: "iceCreamPlace",
  },
  {
    title: "Score",
    dataIndex: "status",
    key: "status",
    render: (status) =>
      status === "Delicious" || status === "Outstanding" ? (
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <CheckCircleFilled className="check-circle" />
          <span> {status}</span>
        </div>
      ) : status === "Disappointing" ? (
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <CloseCircleFilled className="close-circle" />
          <span> {status}</span>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <InfoCircleFilled className="info-circle" /> <span> {status}</span>
        </div>
      ),
  },
  {
    title: "DATE",
    dataIndex: "lastVisit",
    key: "lastVisit",
  },
  {
    title: "How Much I Love It",
    dataIndex: "consumption",
    render: (progress) => <Progress percent={progress} status="active" />,
    key: "consumption",
  },
];

export const PIE_CHART_OPTIONS = {
  labels: ["DAY", "NIGHT", "CANT REMEMBER"],
  colors: ["#FDB813", "#001D4A", "#A9A9A9"],
  chart: {
    width: "50px",
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
    colors: ["#FDB813", "#001D4A", "#A9A9A9"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
  },
};

export const BAR_CHART_OPTIONS = {
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
    colors: ["#6B3E26", "#F3E5AB", "#FC5A8D"],
  },
  legend: {
    show: false,
  },
  colors: ["#6B3E26", "#F3E5AB", "#FC5A8D"],
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "20px",
    },
  },
};

const BASE_URL = "http://localhost:4000";

export const API_ROUTES = {
  BASE_URL,
};
