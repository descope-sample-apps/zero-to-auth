import { Card, Table, Typography } from "antd";

const PriorityDeals = (props) => {
  const { columnsData, tableData, isLoading } = props;

  return (
    <Card>
      <div className="priority-container">
        <Typography style={{ fontSize: 20, color: "#1b2559", fontWeight: 700 }}>
          Priority Deals
        </Typography>
      </div>
      <Table
        rowKey={(record) => record.key}
        columns={columnsData}
        dataSource={tableData}
        pagination={false}
        loading={isLoading}
      />
    </Card>
  );
};

export default PriorityDeals;
