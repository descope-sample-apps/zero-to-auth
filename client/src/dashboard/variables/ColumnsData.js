import { Progress } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleFilled,
} from "@ant-design/icons";

export const columnsDataCheck = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "PROGRESS",
    dataIndex: "progress",
    render: (progress) => <Progress percent={progress} status="active" />,
    key: "progress",
  },
  {
    title: "CUSTOMERS",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "MOST RECENT DEAL",
    dataIndex: "date",
    key: "date",
  },
];
export const columnsDataComplex = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (status) =>
      status === "Signed" ? (
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <CheckCircleFilled className="check-circle" />
          <span> {status}</span>
        </div>
      ) : status === "At Risk" ? (
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
    dataIndex: "date",
    key: "date",
  },
  {
    title: "PROGRESS",
    dataIndex: "progress",
    render: (progress) => <Progress percent={progress} status="active" />,
    key: "progress",
  },
];
