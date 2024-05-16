import React from 'react';
import { Button, Table, Badge } from "antd";
import { Link } from "react-router-dom";
import { useState } from 'react';
import OrdersModel from './Orders';

const { Column } = Table;

const Profile = () => {
    const [open, setOpen] = useState(false);
    const data = [
        {
          key: "1",
          orderNumber: "#3102",
          date: "June 23, 2022",
          items: "2 items",
          total: "$150.00",
          status: "Delivered",
        },
        {
          key: "2",
          orderNumber: "#3101",
          date: "May 15, 2022",
          items: "3 items",
          total: "$249.99",
          status: "Pending",
        },
        {
          key: "3",
          orderNumber: "#3100",
          date: "April 2, 2022",
          items: "1 item",
          total: "$79.99",
          status: "Delivered",
        },
      ];
    
  return (
    <div className="container  px-2 md:px-6 py-8 h-screen  mt-24 ">
    <div className="grid md:grid-cols-2 gap-10 ">
      <div className="bg-white rounded-lg shadow-sm p-6 h-full grid gap-6">
        <div className="flex items-center justify-between mb-4 "> 
          <h2 className="text-2xl font-bold">Customer Profile</h2>
          <Button size="meduim" type="default" >
            Edit Profile
          </Button>
        </div>
        <div className="grid gap-10">
          <div>
            <h3 className="text-lg font-medium mb-1">Name</h3>
            <p>Sophia Anderson</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">Email</h3>
            <p>sophia@example.com</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">Shipping Address</h3>
            <p>
              1234 Main St.
              <br />
              Anytown, CA 12345
            </p>
          </div>
          
        </div>
      </div>
      <div className="bg-white  rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Order History</h2>
          <button className="text-white px-3 py-2  bg-gray-900 hover:underline rounded-lg" onClick={()=>setOpen(true)} >
            View All
          </button>
        </div>
        <Table dataSource={data} pagination={false}>
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
                status={
                  status === "Delivered" ? "success" : "warning"
                }
                text={status}
              />
            )}
          />
        </Table>
      </div>
    </div>
    <OrdersModel open={open} setOpen={setOpen} orders={data}/>
  </div>
  );
};

export default Profile;
