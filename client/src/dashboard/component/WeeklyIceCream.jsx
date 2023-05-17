import { Button, Card, Typography } from "antd";
import { SignalFilled } from "@ant-design/icons";
import BarChart from "../../components/charts/BarChart";

const WeeklyIceCream = ({ barData, isLoading }) => {
  return (
    <Card className="total-spent-container">
      <div className="btn-container">
        <Typography style={{ fontSize: 20, color: "#1b2559", fontWeight: 700 }}>
          Weekly Ice Cream By Flavor
        </Typography>
        <Button>
          <SignalFilled className="icon-signal" />
        </Button>
      </div>
      <div className="bar-container">
        <BarChart barData={barData} isLoading={isLoading} />
      </div>
    </Card>
  );
};

export default WeeklyIceCream;
