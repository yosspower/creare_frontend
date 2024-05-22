import React, { useState } from "react";

import { Modal, Button, Table, Badge } from "antd";
const { Column } = Table;
const OrdersModel = ({ open, setOpen, orders }) => {
  return (
    <Modal
      title="My Orders"
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
    >
      <Table dataSource={orders} pagination={false}>
        <Column title="Order #" dataIndex="orderNumber" key="orderNumber" />
        <Column title="Date" dataIndex="date" key="date" />
        <Column title="Items" dataIndex="items" key="items" />
        <Column title="Total" dataIndex="total" key="total" />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(status) => (
            <Badge
              status={status === "Delivered" ? "success" : "warning"}
              text={status}
            />
          )}
        />
      </Table>
    </Modal>
  );
};
export default OrdersModel;
