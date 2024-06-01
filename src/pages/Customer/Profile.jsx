import React, { useState, useEffect } from "react";
import { Button, Table, Badge, Input, Avatar } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import OrdersModel from "./Orders";
import { CustomerUpdate } from "../../api/auth";
import { MdHistoryToggleOff } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { setUser } from "../../Toolkit/authSlice";
const { Column } = Table;

const Profile = () => {
  const profileInfo = useSelector((state) => state.auth.user);
  const [editedProfile, setEditedProfile] = useState({});
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [editingMode, setEditingMode] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setEditedProfile(profileInfo);
  }, [profileInfo]);

  const handleInputs = (event) => {
    const { value, name } = event.target;
    setEditedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const res = await CustomerUpdate(editedProfile);
    const { status, results, message } = res;

    switch (status) {
      case 200:
        setEditingMode(false);

        break;
      case 409:
        setMessage(message);

        break;

      default:
        break;
    }
  };

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
  const handleCancel = () => {
    setEditedProfile(profileInfo);
    setEditingMode(false);
  };

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "lucomofx");
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dpmzuf21c/image/upload",
          {
            method: "POST",
            body: formData,
          },
        );
        const data = await response.json();
        setEditedProfile({ ...editedProfile, avatar: data.secure_url });
      } catch (error) {
        alert("error uploading image");
        console.error("Error uploading image:", error);
      }
    } else {
      console.error("Invalid file type. Please select an image file.");
    }
  };
  return (
    <div className=" md:px-6 py-0 flex justify-center mt-40 mb-10 ">
      <div className="grid md:grid-cols-2 gap-10   w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 grid gap-0">
          <div className="flex justify-between">
            <div className="flex gap-4 ">
              <ImProfile size={27} />

              <h2 className="text-2xl font-bold">Profile</h2>
            </div>

            {!editingMode && (
              <button
                className={`cursor-pointer px-2 border-2 border-black h-8`}
                onClick={() => setEditingMode(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
          <div className="grid gap-2 pt-10">
            {message && (
              <div
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong class="font-bold">{message}!</strong>

                <span
                  class="absolute top-0 bottom-0 right-0 px-4 py-3"
                  onClick={() => setMessage("")}
                >
                  <svg
                    class="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}
            <div className="h-48">
              <div className=" relative w-fit">
                <Avatar size={185} src={editedProfile.avatar} />

                {editingMode && (
                  <label
                    htmlFor="file-input"
                    className="absolute bg-blue-600 right-7 bottom-2 rounded-full w-9 h-9 pt-1.5 cursor-pointer"
                  >
                    <FaRegEdit size={20} className="mx-auto" color="#fff" />
                  </label>
                )}
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleProfileUpload(e)} // Add your own handler here
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-full">
                <h3 className="text-md font-medium mb-1">First Name</h3>
                <Input
                  className="w-full"
                  value={editedProfile.firstname || ""}
                  name="firstname"
                  onChange={handleInputs}
                  disabled={!editingMode}
                />
              </div>
              <div className="w-full">
                <h3 className="text-md font-medium mb-1">Last Name</h3>
                <Input
                  className="w-full"
                  value={editedProfile.lastname || ""}
                  name="lastname"
                  onChange={handleInputs}
                  disabled={!editingMode}
                />
              </div>
            </div>
            <div>
              <h3 className="text-md font-medium mb-1">Email</h3>
              <Input
                type="email"
                value={editedProfile.email || ""}
                name="email"
                onChange={handleInputs}
                disabled={!editingMode}
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">Shipping Address</h3>
              <Input
                name="shipping_address"
                value={editedProfile.shipping_address || ""}
                onChange={handleInputs}
                disabled={!editingMode}
              />
            </div>
            {editingMode ? (
              <div className="flex justify-end gap-2 p-2">
                <button
                  className=" border-2 border-black  px-4 py-1 rounded-sm"
                  onClick={handleCancel}
                >
                  cancel
                </button>

                <button
                  className="bg-black rounder-md text-white px-4 py-1 rounded-sm"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-4 ">
              <MdHistoryToggleOff size={33} />

              <h2 className="text-2xl font-bold">My Orders</h2>
            </div>
            <button
              className="text-white px-3 py-2 bg-gray-900 hover:underline rounded-lg"
              onClick={() => setOpen(true)}
            >
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
                  status={status === "Delivered" ? "success" : "warning"}
                  text={status}
                />
              )}
            />
          </Table>
        </div>
      </div>
      <OrdersModel open={open} setOpen={setOpen} orders={data} />
    </div>
  );
};

export default Profile;
