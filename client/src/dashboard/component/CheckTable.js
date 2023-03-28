import { Card, Table, Typography } from "antd";

const CheckTable = (props) => {
  const { columnsDataCheck, tableDataCheck } = props;

  return (
    <Card>
      <div className="revenue-container">
        <Typography style={{ fontSize: 20, color: "#1b2559", fontWeight: 700 }}>
          Revenue by Product
        </Typography>
      </div>

      <Table
        className="table-revenue"
        rowKey={(record) => record?.key}
        columns={columnsDataCheck}
        dataSource={tableDataCheck}
        pagination={false}
        size="large"
      ></Table>
    </Card>
  );
};

export default CheckTable;
