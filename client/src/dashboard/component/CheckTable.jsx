import { Card, Table, Typography } from "antd";
import { REV_PRODUCT_COLUMNS } from "../../constants/constants";

const CheckTable = (props) => {
  const { tableDataCheck, isLoading } = props;

  return (
    <Card>
      <div className="revenue-container">
        <Typography style={{ fontSize: 20, color: "#1b2559", fontWeight: 700 }}>
          Revenue by Product
        </Typography>
      </div>

      <Table
        className="table-revenue"
        rowKey={(record) => record.key}
        columns={REV_PRODUCT_COLUMNS}
        dataSource={tableDataCheck}
        pagination={false}
        size="large"
        loading={isLoading}
      ></Table>
    </Card>
  );
};

export default CheckTable;
