import { Card, Table, Typography } from "antd";

const PriorityDeals = (props) => {
  const { columnsData, tableData } = props;

  return (
    <Card>
      <div className="priority-container">
        <Typography style={{ fontSize: 20, color: "#1b2559", fontWeight: 700 }}>
          Priority Deals
        </Typography>
      </div>
      <Table
        rowKey={(record) => record.uid}
        columns={columnsData}
        dataSource={tableData}
        pagination={false}
      />
    </Card>
  );
};

export default PriorityDeals;
