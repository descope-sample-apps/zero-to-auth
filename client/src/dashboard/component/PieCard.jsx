import { Card, Typography } from "antd";
import React from "react";
import PieChart from "../../components/charts/PieChart";

const PieCard = ({ pieData = [], isLoading }) => {
  return (
    <Card className="pi-wrapper">
      <div className="pie-container">
        <Typography style={{ fontSize: 16, color: "#1b2559", fontWeight: 700 }}>
          Ice Cream Daily Distribution
        </Typography>
      </div>
      <div className="pie-chart">
        <PieChart pieData={pieData} isLoading={isLoading} />
      </div>
      <div className="chart-detail">
        <div className="abc">
          <div className="flex-place">
            <div className="chart-series us-col" />
            <Typography style={{ color: "#FDB813" }}>DAY</Typography>
          </div>
          <Typography
            style={{ fontSize: 16, color: "#FDB813", fontWeight: 700 }}
          >
            {pieData.length > 0 && pieData[0]}
          </Typography>
        </div>
        <div className="abc">
          <div className="flex-place">
            <div className="chart-series canada-col" />
            <Typography style={{ color: "#001D4A" }}>NIGHT</Typography>
          </div>
          <Typography
            style={{ fontSize: 16, color: "#001D4A", fontWeight: 700 }}
          >
            {pieData.length > 0 && pieData[1]}
          </Typography>
        </div>
        <div className="abc">
          <div className="flex-place">
            <div className="chart-series other-col" />
            <Typography style={{ color: "#a3aed0" }}>CAN'T REMEMBER</Typography>
          </div>
          <Typography
            style={{ fontSize: 16, color: "#001D4A", fontWeight: 700 }}
          >
            {pieData.length > 0 && pieData[2]}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default PieCard;
