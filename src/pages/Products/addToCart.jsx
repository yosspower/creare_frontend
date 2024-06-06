import React ,{ useContext, useEffect, useState } from 'react';
import { Modal, Button, Select, Input, Rate } from 'antd';
import 'tailwindcss/tailwind.css';
import { CartContext } from "../../contexts/CartContext";

const { Option } = Select;

export default function AddDesignedCart({variantsOpen,handleCancel,category,design}) {
  const { addToCart } = useContext(CartContext);
const [productVariants ,setProductVariants] = useState({
  id: generateObjectId(),
  quantity:0,
  price:33,
  name:`designed `,
  image:null,
  variants:{
    color:"#000",
  size:"m"
  }

})
function generateObjectId() {
  const timestamp = (Math.floor(Date.now() / 1000)).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
    return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
}

useEffect(() => {
  setProductVariants({...productVariants,image:design})

}, [design]);

  return (
    <Modal
      title="Add to Cart"
      visible={variantsOpen}
      onCancel={handleCancel}
      footer={[
        
      ]}
    >
      <div className="grid gap-6 py-4">
        <div className="flex items-start gap-4">
          <img
            src={ design ? design : category.mockup}
            alt="Product Image"
            width={100}
            height={100}
            className="aspect-square object-cover rounded-md"
          />
          <div className="grid gap-2">
            <h3 className="font-extrabold">{category.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              60% combed ringspun cotton/40% polyester jersey tee.
            </p>
    
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <label htmlFor="quantity" className="text-right">
            Quantity
          </label>
          <div className="flex items-center gap-2">
            <Button className="h-8 w-8 flex items-center justify-center" icon={<MinusIcon />} 
            
            onClick={(e)=>setProductVariants({...productVariants,quantity:productVariants.quantity-1})}
            />
            <Input id="quantity" type="number" defaultValue={1} onChange={(e)=>setProductVariants({...productVariants,quantity:e.target.value})} className="w-16 text-center" value={productVariants.quantity} />
            <Button className="h-8 w-8 flex items-center justify-center" icon={<PlusIcon />} 
            
            onClick={(e)=>setProductVariants({...productVariants,quantity:productVariants.quantity+1})}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <label htmlFor="size" className="text-right">
            Size
          </label>
          <Select defaultValue="m" className="w-full" 
          
          onChange={(value) =>
            setProductVariants({
              ...productVariants,
              variants: {
                ...productVariants.variants,
                size: value,
              },
            })
          }
          >
            <Option value="xs">XS</Option>
            <Option value="s">S</Option>
            <Option value="m">M</Option>
            <Option value="l">L</Option>
            <Option value="xl">XL</Option>
          </Select>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <label htmlFor="color" className="text-right">
            Color
          </label>
          <Select defaultValue="#000" className="w-full" 
          
          onChange={(value) =>
            setProductVariants({
              ...productVariants,
              variants: {
                ...productVariants.variants,
                color: value,
              },
            })
          }
          >

            {["#000","#fff","#4A453E"].map((color)=>(
            <Option value={color}><div className='w-5 h-5 rounded-full border border-black' style={{ backgroundColor:color }}></div></Option>
            ))}



          </Select>
        </div>
      </div>
      <Button key="submit" className='bg-[#00ADB5]' onClick={()=>addToCart(productVariants,productVariants.id)}>
          Add to Cart
        </Button>,
    </Modal>
    
  );
}

function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
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
      width="24"
      height="24"
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
