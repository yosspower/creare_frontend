import React, { useState, useEffect, useRef, useContext } from "react";
import { fabric } from "fabric";
import tshirt from "./tshirt.png";
import { saveAs } from "file-saver";
import { FaTextHeight } from "react-icons/fa6";
import { FaFileAlt ,FaCartPlus } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";
import { CartContext } from "../../contexts/CartContext";


const Preview = () => {
  const { addToCart } =useContext(CartContext);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [mode, setMode] = useState("add-text");
  const [textInfo, setTextInfo] = useState({
    text: "hello world",
    color: "#fff",
    font: "Roboto",
    bgColor:"",
    fontWeight:"normal",
    charSpacing:0
  });

  const [activeBackground,setActiveBackground] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [canvas, setCanvas] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [fontWeightOptions] =useState( [
    "normal",
    "bold",
    "bolder",
    "lighter",
    "900"
  ]
)
  const [options] = useState([
    "Roboto",
    "Arial",
    "Times New Roman",
    "Helvetica",
    "Verdana",
    "Courier New",
    "Georgia",
    "Palatino",
    "Garamond",
    "Comic Sans MS",
    "Trebuchet MS",
    "Arial Black",
    "Impact",
    "Lucida Sans",
    "Tahoma",
    "Century Gothic",
    "Lucida Console",
    "Franklin Gothic Medium",
    "Gill Sans",
    "Optima",
    "Candara",
    "Bookman",
    "Futura",
    "Baskerville",
    "Consolas",
    "Monaco",
    "Brush Script MT",
    "Copperplate",
    "Papyrus",
    "Segoe UI",
    "Ubuntu",
    "PT Serif",
    "Lato",
    "Open Sans",
    "Merriweather",
    "Raleway",
    "Droid Serif",
    "Playfair Display",
    "Work Sans",
    "Nunito",
    "Oswald",
  ]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
useEffect(() => {
  if (selectedObject && selectedObject.type === "text") {
  if (!activeBackground) {
  
      selectedObject.set("backgroundColor", "");
     
    }else{
 
      selectedObject.set("backgroundColor", textInfo.bgColor);

    }
    canvas.renderAll();
  }

},[activeBackground]);



  const handleOptionClick = (font) => {
    setTextInfo({ ...textInfo, font });
    if (selectedObject && selectedObject.type === "text") {
      selectedObject.set("fontFamily", font);
      canvas.renderAll();
    }

    setIsOpen(false);
  };

  function handleTextChange(event) {
    const { name, value } = event.target;
    setTextInfo({ ...textInfo, [name]: value });

    if (selectedObject && selectedObject.type === "text") {
      if (name === "text") {
        selectedObject.set("text", value);
      } else if (name === "color") {
        selectedObject.set("fill", value);
      }else if (name === "bgColor") {
        selectedObject.set("backgroundColor", value);
      }
      else if (name === "charSpacing") {
        selectedObject.set("charSpacing",value);
      }
      canvas.renderAll();
    }
  }
function addFontWeight(fontWeight){
  setTextInfo({ ...textInfo, fontWeight });
  if (selectedObject && selectedObject.type === "text") {
    selectedObject.set("fontWeight", fontWeight);
    canvas.renderAll();
  }
}
  function addText() {
    const textObject = new fabric.Text(textInfo.text, {
      left: 100,
      top: 100,
      fill: textInfo.color,
      fontSize: 50,
      
      
      fontFamily: textInfo.font,
      backgroundColor: "",
      fontWeight:textInfo.fontWeight,
  charSpacing: textInfo.charSpacing,
  lineHeight: 2
    });


    canvas.add(textObject);
    canvas.setActiveObject(textObject);
    setSelectedObject(textObject);

  }

  function deleteSelectedObject() {
    if (selectedObject) {
      canvas.remove(selectedObject);
      setSelectedObject(null);
    }
  }

  useEffect(() => {
    const canvasInstance = new fabric.Canvas(canvasRef.current);
    canvasInstance.globalCompositeOperation = 'destination-in';
    setCanvas(canvasInstance);

    fabric.Image.fromURL(tshirt, function(img) {
      img.crossOrigin = 'anonymous';
      img.scaleToWidth(canvasInstance.width);
      img.scaleToHeight(canvasInstance.height);
      canvasInstance.setBackgroundImage(img, canvasInstance.renderAll.bind(canvasInstance));
    });

    // Handle object selection
    canvasInstance.on("selection:created", (e) => {
      setSelectedObject(e.selected[0]);
      setActiveBackground(!!e.selected[0]?.backgroundColor);
    });

    canvasInstance.on("selection:updated", (e) => {
      setSelectedObject(e.selected[0]);
      setActiveBackground(!!e.selected[0]?.backgroundColor);
    });

    canvasInstance.on("selection:cleared", () => {
      setActiveBackground(false);
      setSelectedObject(null);
    });

    // Upload image functionality
    const uploadImage = async (event) => {
      const file = event.target.files[0];
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
            }
          );
          const data = await response.json();
          const imgObj = new Image();
          imgObj.crossOrigin = 'anonymous';
          imgObj.src = data.secure_url;
          imgObj.onload = function () {
            const img = new fabric.Image(imgObj);
            img.scaleToWidth(200);
            canvasInstance.add(img);
          };
        } catch (error) {
          alert("error uploading image");
          console.error("Error uploading image:", error);
        }
      } else {
        console.error("Invalid file type. Please select an image file.");
      }
    };

    fileInputRef.current.addEventListener("change", uploadImage);

    return () => {
   
      canvasInstance.dispose();
    };
  }, []);

  
  const saveToCart = async () => {
    // canvas.renderAll();
    // const dataURL = canvas.toDataURL({
    //   format: 'png',
    //   quality: 1.0
    // });
  
    // // Convert dataURL to Blob
    // const blob = await fetch(dataURL).then(res => res.blob());
  
    // const formData = new FormData();
    // formData.append("file", blob);
    // formData.append("upload_preset", "lucomofx");
  
    // try {
    //   const response = await fetch(
    //     "https://api.cloudinary.com/v1_1/dpmzuf21c/image/upload",
    //     {
    //       method: "POST",
    //       body: formData,
    //     },
    //   );
  
    //   if (!response.ok) {
    //     throw new Error('Error uploading image');
    //   }
  
    //   const data = await response.json();
   
      
      
  
    // } catch (error) {
    //   alert("Error uploading image");
    //   console.error("Error uploading image:", error);
    // }
  };
  
  const saveAsPNG = () => {
    if (canvas) {
       // save as png
      canvas.renderAll();
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1.0
      });
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'tshirt-design.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);


      // save as json
      // const canvasJSON = JSON.stringify(canvas.toJSON());
      // const blob = new Blob([canvasJSON], { type: 'application/json' });
      // saveAs(blob, 'tshirt-design.json');
    }
  };
  return (
    <div className="pb-12 pt-28 px-4 md:mx-20">
      <div className="grid md:grid-cols-2 gap-24 justify-center">
        <div className="flex flex-col gap-14 pt-20">
          <div>
            <h1 className="text-3xl font-bold">Design Your Own Product</h1>
            <p className="text-[#00ADB5]  opacity-70 mt-2">
              Upload your design or create a new one using our tools.
            </p>
          </div>
<div className="w-full flex h-12 ">


<div
 className={`${mode == "add-text" && " bg-gray-100 "} cursor-pointer  shadow-md   text-center font-bold flex justify-center w-full gap-3 `}
onClick={()=>setMode("add-text")}
>
<FaTextHeight size={22} color="#00ADB5" className="my-auto " /> 
<div className={` w-fit my-auto `} >Text</div>

</div>

<div
 className={`${mode == "add-image" && " bg-gray-100 "} cursor-pointer  shadow-md   text-center font-bold flex justify-center w-full gap-3 `}
onClick={()=>setMode("add-image")}
>
<FaFileAlt  size={20} color="#00ADB5" className="my-auto" />

<div className={` w-fit my-auto `} >file</div>

</div>


          </div>
       
{
  mode === "add-text" && (
    <div className="grid gap-9 ">
           
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="text"
                >
                Text
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="text"
                  placeholder="Enter your text"
                  name="text"
                  value={selectedObject ? selectedObject.text : textInfo.text}
                  onChange={handleTextChange}
                />
              </div>
              <div>
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="font"
                >
                  Font
                </label>
                <button
                  type="button"
                  role="combobox"
                  aria-controls="radix-:r1b:"
                  aria-expanded={isOpen}
                  aria-autocomplete="none"
                  dir="ltr"
                  data-state={isOpen ? "open" : "closed"}
                  className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                  onClick={toggleDropdown}
                >
                  <span style={{ pointerEvents: "none" }}>
                    {selectedObject ? selectedObject.fontFamily : textInfo.font}
                  </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
                {isOpen && (
                  <div className="absolute mt-1 w-[310px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <ul
                      className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                      role="listbox"
                      aria-labelledby="listbox-label"
                      aria-activedescendant="listbox-option-3"
                    >
                      {options.map((option, index) => (
                        <li
                          key={index}
                          className={`cursor-default select-none relative py-2 pl-3 pr-9  ${
                            selectedObject &&
                            selectedObject.fontFamily === option
                              ? "text-white bg-indigo-600"
                              : "text-gray-900"
                          }`}
                          role="option"
                          onClick={() => handleOptionClick(option)}
                        >
                          <span
                            className={`block truncate ${selectedObject && selectedObject.fontFamily === option ? "font-semibold" : "font-normal"}`}
                          >
                            {option}
                          </span>
                          {selectedObject &&
                            selectedObject.fontFamily === option && (
                              <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414L9 14.414l-3.707-3.707a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
       
          <div className="grid grid-cols-2 gap-4">
          <div className="flex gap-4 items-center">
            <span className="h-fit font-bold text-md">Color:</span>
            <label
              htmlFor="color"
              className="h-10 w-10 border-2 font-bold rounded-md cursor-pointer"
              style={{
                backgroundColor: selectedObject
                  ? selectedObject.fill
                  : textInfo.color,
              }}
            ></label>
          </div>
   {/* backgroundColor */}
   
       {
        selectedObject && (
          <div className="flex gap-4 items-center">
          <span className="h-fit font-bold text-md">Background :</span>
          <div>
            <input type="checkbox" checked={activeBackground} name="active-bg" onChange={(e)=>setActiveBackground(e.target.checked)}  />

            </div>
           

            <label
              htmlFor="bgColor"
              className={`${!activeBackground && "hidden" } h-10 w-10 border-2 font-bold rounded-md cursor-pointer`}
              style={{
                backgroundColor: selectedObject
                  ? selectedObject.backgroundColor
                  : textInfo.bgColor,
              }}
            ></label>
       
  
         
          </div>
        )
       }

        </div>


        <div className="mb-6">
      <h3 className="text-md font-medium mb-2">Letter Spacing</h3>
      <div className="flex items-center">
        <input 
         type="range"
         name="charSpacing"
        min={0}
        max={300}
        step={25}
        value={ selectedObject ? selectedObject.charSpacing : parseFloat(textInfo.charSpacing)}
         className="  w-1/2 mr-4" onChange={handleTextChange}/>
        <span className="text-sm">{selectedObject ? selectedObject.charSpacing  : parseFloat(textInfo.charSpacing)} pixels</span>
      </div>
    </div>
    <div className="">
  <label htmlFor="fontWeight" className="text-md block font-medium mb-2">Font Weight:</label>
  <div className="">

  {
    fontWeightOptions.map((font,index)=>(
      <button key={index} className={`${font === textInfo.fontWeight && " bg-black text-white"} px-3 py-2 mx-2 my-2   outline border  rounded-md text-sm font-bold`} onClick={()=>addFontWeight(font)}>{font}</button>

    ))
  }
  </div>


</div>
          <input
            type="color"
            name="bgColor"
            onChange={handleTextChange}
            id="bgColor"
            className="hidden"
          />
                   <input
            type="color"
            name="color"
            onChange={handleTextChange}
            id="color"
            className="hidden"
          />
{
  !selectedObject && (
    <button className="px-4 py-3 bg-black text-white rounded-md" onClick={addText}>
            Add text
          </button>
  )
}
      
     
    </div>
  )
}
{
  mode === "add-image" && (
<>
<label
            htmlFor="upload-design"
            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10 text-[#00ADB5]"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <p className="text-gray-500 dark:text-gray-400">
              Drag and drop your design or{" "}
              <span className="text-[#00ADB5] opacity-75 font-medium">browse files</span>
            </p>
           
          </label>

     
</>
  )
}
{selectedObject && (
            <button
              className="px-4 py-3 bg-red-500 text-white"
              onClick={deleteSelectedObject}
            >
              Delete selected item
            </button>
          )}
<input
            type="file"
            ref={fileInputRef}
            id="upload-design"
            className="hidden"
          />

        </div>
        <div className="flex flex-col gap-6 w-fit">
          <div className="border rounded-lg overflow-hidden ">
            <div className="relative w-full ">
              <div className="absolute w-full">
                {/* <img
                  src={tshirt}
                  width={500}
                  height={500}
                  alt="Product Mockup"
                  className=" "
                /> */}
              </div>
              <canvas ref={canvasRef} width={500} height={500}></canvas>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800">
              <h3 className="text-lg font-bold">Preview Your Design</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                See how your design will look on
              </p>
            </div>
          </div>
          <div className="flex gap-4 h-11">
          <button
              className=" px-4 py-1  w-full bg-[#00ADB5] text-white rounded-md flex justify-center items-center gap-2"
           onClick={saveToCart}
            >
             <FaCartPlus size={20} />
             <span >
             Add to cart
              </span> 
              
            </button>
            <button
              className=" px-4  bg-black text-white rounded-md flex justify-center items-center gap-2"
              onClick={saveAsPNG}
            >
               <MdSaveAlt size={20} />
             <span>
             Save 
              </span> 
            </button>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
``;
