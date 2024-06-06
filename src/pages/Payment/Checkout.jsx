
import React, { useContext } from "react";
import { Row, Col, Divider, Radio, Input, Select, Button } from "antd";
import { CreditCardOutlined, DollarOutlined, WalletOutlined } from '@ant-design/icons';
import { CartContext } from "../../contexts/CartContext";
import { makeOrder } from "../../api/order";
export default function Checkout() {
    const addOrder = async ()=>{
        const res = await makeOrder(cart);
        const {status,results}= res;
        switch (status) {
            case 201:
                window.location.href ="/"
                break;
                case 400:
                alert("server error")
                break;
        
            default:
                alert("no response")

                break;
        }
    }
    const { cart, clearCart, itemAmount, total } = useContext(CartContext);
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto pt-32 mb-11">
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl">Your Cart ({itemAmount})</h1>

          <div className="grid gap-4">
            {cart.length > 0 ? cart.map((item,index)=>(
    <div className="flex items-center gap-4" key={index}>
    <img
      src={item.image}
      alt="Product Image"
      width={100}
      height={100}
      className="aspect-square object-cover rounded-md"
    />
    <div className="flex-1 grid gap-1">
      <h3 className="font-medium">{item.name}</h3>
      <div className="flex items-center gap-2">
        <div className="text-sm text-gray-500 dark:text-gray-400">Quantity: {item.quantity }</div>
        <div className="text-sm font-medium">${item.price * item.quantity}.99</div>
      </div>
    </div>
  </div>
            )):(
                <h3 className="font-semibold text-[#00ADB5] ">No Products in the cart</h3>
            )}
        
           
          </div>
        </div>
        <Divider />
        <div className="grid gap-4">
          <h2 className="font-bold text-2xl">Order Summary</h2>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="text-gray-500 dark:text-gray-400">Subtotal</div>
              <div>${total}</div>
            </div>
        
            <div className="flex items-center justify-between">
              <div className="text-gray-500 dark:text-gray-400">Shipping</div>
              <div>$5.00</div>
            </div>
            <Divider />
            <div className="flex items-center justify-between font-medium">
              <div>Total</div>
              <div>${total+5}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-4">
          <h2 className="font-bold text-2xl">Payment</h2>
          <Radio.Group defaultValue="card" className="grid grid-cols-3 gap-4">
            <Radio.Button value="card" className="flex flex-col items-center justify-between rounded-md border-2 px-4">
              <CreditCardOutlined className="mb-3 h-6 w-6" />
              Credit Card
            </Radio.Button>
            <Radio.Button value="paypal" className="flex flex-col items-center justify-between rounded-md border-2 px-4">
              <WalletOutlined className="mb-3 h-6 w-6" />
              PayPal
            </Radio.Button>
            <Radio.Button value="apple" className="flex flex-col items-center justify-between rounded-md border-2 px-4">
              <DollarOutlined className="mb-3 h-6 w-6" />
              Apple Pay
            </Radio.Button>
          </Radio.Group>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="address">new Adreess (optional)</label>
            <Input id="address" placeholder="adress" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="number">Card number</label>
            <Input id="number" placeholder="" type="number" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <label htmlFor="month">Expires</label>
              <Select id="month" placeholder="Month">
                <Select.Option value="1">January</Select.Option>
                <Select.Option value="2">February</Select.Option>
                <Select.Option value="3">March</Select.Option>
                <Select.Option value="4">April</Select.Option>
                <Select.Option value="5">May</Select.Option>
                <Select.Option value="6">June</Select.Option>
                <Select.Option value="7">July</Select.Option>
                <Select.Option value="8">August</Select.Option>
                <Select.Option value="9">September</Select.Option>
                <Select.Option value="10">October</Select.Option>
                <Select.Option value="11">November</Select.Option>
                <Select.Option value="12">December</Select.Option>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="year">Year</label>
              <Select id="year" placeholder="Year">
                <Select.Option value="2024">2024</Select.Option>
                <Select.Option value="2025">2025</Select.Option>
                <Select.Option value="2026">2026</Select.Option>
                <Select.Option value="2027">2027</Select.Option>
                <Select.Option value="2028">2028</Select.Option>
                <Select.Option value="2029">2029</Select.Option>
                <Select.Option value="2030">2030</Select.Option>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="cvc">CVC</label>
              <Input id="cvc" placeholder="CVC" />
            </div>
          </div>
        </div>
        <Button className="w-full bg-[#00ADB5] text-white h-11"
        disabled={cart.length > 0 ? false : true}
        onClick={addOrder}
        >Place Order</Button>
      </div>
    </div>
  );
}
