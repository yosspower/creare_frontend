import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Select, Input } from "antd";
import { CartContext } from "../../contexts/CartContext";

const { Option } = Select;

const SIZES = ["xs", "s", "m", "l", "xl"];
const COLORS = ["#000000", "#ffffff", "#4A453E"];

function generateObjectId() {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
}

import { useNavigate } from "react-router-dom";

export default function AddDesignedCart({
  variantsOpen,
  handleCancel,
  category,
  design,
}) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [productVariants, setProductVariants] = useState({
    id: generateObjectId(),
    quantity: 1,
    price: 33,
    name: "Custom design",
    image: null,
    variants: {
      color: "#000000",
      size: "m",
    },
  });

  useEffect(() => {
    if (design) {
      setProductVariants((prev) => ({ ...prev, image: design }));
    }
  }, [design]);

  const setQuantity = (value) => {
    const quantity = Math.max(1, Number(value) || 1);
    setProductVariants((prev) => ({ ...prev, quantity }));
  };

  const handleSubmit = () => {
    addToCart(productVariants, productVariants.id);
    handleCancel();
    navigate("/shop");
  };

  const previewImage = design || category?.mockup;

  return (
    <Modal
      title="Add to Cart"
      open={variantsOpen}
      onCancel={handleCancel}
      okText="Add to Cart"
      cancelText="Cancel"
      onOk={handleSubmit}
      okButtonProps={{
        style: { backgroundColor: "#00ADB5", borderColor: "#00ADB5" },
      }}
    >
      <div className="grid gap-6 py-2">
        <div className="flex items-start gap-4">
          {previewImage && (
            <img
              src={previewImage}
              alt="Design preview"
              className="h-24 w-24 rounded-lg border border-gray-200 object-cover"
            />
          )}
          <div className="grid gap-1">
            <h3 className="text-base font-semibold text-gray-900">
              {category?.name || "Custom design"}
            </h3>
            <p className="text-sm text-gray-500">
              60% combed ringspun cotton / 40% polyester jersey tee.
            </p>
            <p className="font-bold text-[#00ADB5]">${productVariants.price}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Quantity</label>
          <div className="flex items-center justify-end gap-2">
            <Button
              size="small"
              icon={<MinusIcon />}
              disabled={productVariants.quantity <= 1}
              onClick={() => setQuantity(productVariants.quantity - 1)}
            />
            <Input
              type="number"
              min={1}
              value={productVariants.quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-16 text-center"
            />
            <Button
              size="small"
              icon={<PlusIcon />}
              onClick={() => setQuantity(productVariants.quantity + 1)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Size</label>
          <Select
            value={productVariants.variants.size}
            className="w-full"
            onChange={(value) =>
              setProductVariants((prev) => ({
                ...prev,
                variants: { ...prev.variants, size: value },
              }))
            }
          >
            {SIZES.map((size) => (
              <Option key={size} value={size}>
                {size.toUpperCase()}
              </Option>
            ))}
          </Select>
        </div>

        <div className="grid grid-cols-2 items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Color</label>
          <Select
            value={productVariants.variants.color}
            className="w-full"
            onChange={(value) =>
              setProductVariants((prev) => ({
                ...prev,
                variants: { ...prev.variants, color: value },
              }))
            }
          >
            {COLORS.map((color) => (
              <Option key={color} value={color}>
                <div className="flex items-center gap-2">
                  <span
                    className="h-4 w-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                  <span>{color}</span>
                </div>
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </Modal>
  );
}

function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
