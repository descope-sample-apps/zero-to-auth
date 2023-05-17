import { Card, Table, Typography } from "antd";
import { PRIORITIZED_DEALS_COLUMNS } from "../../constants/constants";

const IceCreamPlaces = (props) => {
  const { tableData, isLoading } = props;

  return (
    <Card>
      <div className="priority-container">
        <Typography style={{ fontSize: 20, color: "#1b2559", fontWeight: 700 }}>
          My Ice Cream Places
        </Typography>
      </div>
      <Table
        rowKey={(record) => record.key}
        columns={PRIORITIZED_DEALS_COLUMNS}
        dataSource={tableData}
        pagination={false}
        loading={isLoading}
      />
    </Card>
  );
};

export default IceCreamPlaces;
