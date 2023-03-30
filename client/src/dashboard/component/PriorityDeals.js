import { Card, Table, Typography } from "antd";
import { CONST } from "../../constants/constants";

const PriorityDeals = (props) => {
  const { tableData, isLoading } = props;

  return (
    <Card>
      <div className="priority-container">
        <Typography style={{ fontSize: 20, color: "#1b2559", fontWeight: 700 }}>
          Priority Deals
        </Typography>
      </div>
      <Table
        rowKey={(record) => record.key}
        columns={CONST.priorityDealsColumns}
        dataSource={tableData}
        pagination={false}
        loading={isLoading}
      />
    </Card>
  );
};

export default PriorityDeals;
