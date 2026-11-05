import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { FaTextHeight } from "react-icons/fa6";
import { FaFileAlt, FaCartPlus, FaCheck, FaTrash } from "react-icons/fa";
import {
  MdSaveAlt,
  MdFlipToFront,
  MdFlipToBack,
  MdDeleteSweep,
  MdCenterFocusStrong,
  MdArrowUpward,
  MdArrowDownward,
} from "react-icons/md";
import { Spin, Popconfirm, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getOneCategories } from "../../api/categories";
import AddDesignedCart from "./addToCart";

const FONT_WEIGHT_OPTIONS = ["normal", "bold", "bolder", "lighter", "900"];

const FONT_OPTIONS = [
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
];

const Preview = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [variantsOpen, setVariantsOpen] = useState(false);
  const [mode, setMode] = useState("add-text");
  const [completed, setCompleted] = useState(false);
  const [designImage, setDesignImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isBackgroundLoading, setIsBackgroundLoading] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [category, setCategory] = useState({});
  const [canvas, setCanvas] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [activeBackground, setActiveBackground] = useState(false);
  const [isFontOpen, setIsFontOpen] = useState(false);
  const [textInfo, setTextInfo] = useState({
    text: "",
    color: "#111827",
    font: "Roboto",
    bgColor: "#ffffff",
    fontWeight: "normal",
    charSpacing: 0,
  });

  const handleCancel = () => setVariantsOpen(false);
  const toggleFontDropdown = () => setIsFontOpen((prev) => !prev);

  const handleOptionClick = (font) => {
    setTextInfo((prev) => ({ ...prev, font }));
    if (selectedObject && selectedObject.type === "text" && canvas) {
      selectedObject.set("fontFamily", font);
      canvas.renderAll();
      setSelectedObject({ ...selectedObject });
    }
    setIsFontOpen(false);
  };

  const handleTextChange = (event) => {
    const { name: field, value } = event.target;
    setTextInfo((prev) => ({ ...prev, [field]: value }));

    if (selectedObject && selectedObject.type === "text" && canvas) {
      if (field === "text") {
        selectedObject.set("text", value);
      } else if (field === "color") {
        selectedObject.set("fill", value);
      } else if (field === "bgColor") {
        selectedObject.set("backgroundColor", value);
      } else if (field === "charSpacing") {
        selectedObject.set("charSpacing", Number(value));
      }
      canvas.renderAll();
    }
  };

  const handleFontWeight = (fontWeight) => {
    setTextInfo((prev) => ({ ...prev, fontWeight }));
    if (selectedObject && selectedObject.type === "text" && canvas) {
      selectedObject.set("fontWeight", fontWeight);
      canvas.renderAll();
    }
  };

  const bringToFront = () => {
    if (selectedObject && canvas) {
      selectedObject.bringToFront();
      canvas.renderAll();
      message.success("Object moved to front");
    }
  };

  const bringForward = () => {
    if (selectedObject && canvas) {
      selectedObject.bringForward();
      canvas.renderAll();
      message.success("Object moved forward");
    }
  };

  const sendBackwards = () => {
    if (selectedObject && canvas) {
      selectedObject.sendBackwards();
      // Ensure background image stays at the very back
      const backgroundImage = canvas.backgroundImage;
      if (backgroundImage) {
        backgroundImage.sendToBack();
      }
      canvas.renderAll();
      message.success("Object moved backwards");
    }
  };

  const sendToBack = () => {
    if (selectedObject && canvas) {
      selectedObject.sendToBack();
      const backgroundImage = canvas.backgroundImage;
      if (backgroundImage) {
        backgroundImage.sendToBack();
      }
      canvas.renderAll();
      message.success("Object moved to back");
    }
  };

  const centerObject = () => {
    if (selectedObject && canvas) {
      selectedObject.center();
      selectedObject.setCoords();
      canvas.renderAll();
      message.success("Object centered");
    }
  };

  const clearCanvas = () => {
    if (canvas) {
      const objects = canvas.getObjects();
      // Remove all objects except background image
      objects.forEach((obj) => {
        if (obj !== canvas.backgroundImage) {
          canvas.remove(obj);
        }
      });
      canvas.discardActiveObject();
      canvas.renderAll();
      setSelectedObject(null);
      setActiveBackground(false);
      message.success("Canvas cleared");
    }
  };

  const handleActiveBackgroundChange = (checked) => {
    setActiveBackground(checked);
    if (selectedObject && selectedObject.type === "text" && canvas) {
      selectedObject.set("backgroundColor", checked ? textInfo.bgColor : "");
      canvas.renderAll();
    }
  };

  const addText = () => {
    if (!canvas || !textInfo.text.trim()) return;

    // Fabric.js charSpacing is in 1/1000 of fontSize
    const fabricCharSpacing = (Number(textInfo.charSpacing) / 40) * 1000;

    const textObject = new fabric.Text(textInfo.text, {
      left: canvas.getWidth() / 2,
      top: canvas.getHeight() / 2,
      originX: "center",
      originY: "center",
      fill: textInfo.color,
      fontSize: 40,
      fontFamily: textInfo.font,
      backgroundColor: activeBackground ? textInfo.bgColor : "",
      fontWeight: textInfo.fontWeight,
      charSpacing: fabricCharSpacing,
    });

    canvas.add(textObject);
    canvas.setActiveObject(textObject);
    canvas.renderAll();
    setSelectedObject(textObject);

    // Clear input after adding
    setTextInfo((prev) => ({ ...prev, text: "" }));
  };

  const deleteSelectedObject = () => {
    if (selectedObject && canvas) {
      canvas.remove(selectedObject);
      canvas.discardActiveObject();
      canvas.renderAll();
      setSelectedObject(null);
      setActiveBackground(false);
    }
  };

  // Set up the fabric canvas and load the product mockup
  useEffect(() => {
    const canvasInstance = new fabric.Canvas(canvasRef.current, {
      preserveObjectStacking: true,
      width: 500,
      height: 600,
    });
    setCanvas(canvasInstance);
    setIsBackgroundLoading(true);

    async function loadCategory() {
      const categoryData = await getOneCategories(name);
      setCategory(categoryData);

      if (!categoryData?.mockup) {
        setIsBackgroundLoading(false);
        message.error("This category does not support custom designs yet.");
        navigate("/shop");
        return;
      }

      fabric.Image.fromURL(
        categoryData.mockup,
        function (img) {
          if (!img) {
            setIsBackgroundLoading(false);
            return;
          }

          const canvasWidth = 500;
          const canvasHeight = 600;

          // Scale to fit canvas
          const scale = Math.min(
            canvasWidth / img.width,
            canvasHeight / img.height,
            1,
          );

          img.set({
            scaleX: scale,
            scaleY: scale,
            left: canvasWidth / 2,
            top: canvasHeight / 2,
            originX: "center",
            originY: "center",
            selectable: false,
            evented: false,
            hoverCursor: "default",
          });

          canvasInstance.add(img);
          img.sendToBack();
          canvasInstance.renderAll();
          setIsBackgroundLoading(false);
        },
        { crossOrigin: "Anonymous" },
      );
    }

    loadCategory();

    canvasInstance.on("selection:created", (e) => {
      const target = e.selected?.[0] ?? null;
      setSelectedObject(target);
      setActiveBackground(!!target?.backgroundColor);
    });
    canvasInstance.on("selection:updated", (e) => {
      const target = e.selected?.[0] ?? null;
      setSelectedObject(target);
      setActiveBackground(!!target?.backgroundColor);
    });
    canvasInstance.on("selection:cleared", () => {
      setSelectedObject(null);
      setActiveBackground(false);
    });

    return () => {
      canvasInstance.off();
      canvasInstance.dispose();
      setCanvas(null);
      setSelectedObject(null);
    };
  }, [name]);
  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }
    if (!canvas) return;

    setIsImageLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "lucomofx");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dpmzuf21c/image/upload",
        { method: "POST", body: formData },
      );
      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();

      const imgObj = new Image();
      imgObj.crossOrigin = "Anonymous";
      imgObj.src = data.secure_url;
      imgObj.onload = () => {
        const img = new fabric.Image(imgObj);
        const maxWidth = canvas.getWidth() * 0.6;
        if (img.width > maxWidth) img.scaleToWidth(maxWidth);
        img.set({
          left: canvas.getWidth() / 2,
          top: canvas.getHeight() / 2,
          originX: "center",
          originY: "center",
        });
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        setSelectedObject(img);
        setIsImageLoading(false);
      };
      imgObj.onerror = () => {
        setIsImageLoading(false);
        alert("Could not load the uploaded image. Please try again.");
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsImageLoading(false);
      alert("Error uploading image. Please try again.");
    }
  };

  const saveDesign = async () => {
    if (!canvas) return;
    setIsCompleting(true);
    try {
      canvas.discardActiveObject();
      canvas.renderAll();
      const dataURL = canvas.toDataURL({ format: "png", quality: 1 });
      const blob = await (await fetch(dataURL)).blob();

      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", "lucomofx");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dpmzuf21c/image/upload",
        { method: "POST", body: formData },
      );
      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();

      setDesignImage(data.secure_url);
      setCompleted(true);
    } catch (error) {
      console.error("Error saving design:", error);
      alert("Error saving your design. Please try again.");
    } finally {
      setIsCompleting(false);
    }
  };

  const handleEditAgain = () => {
    setCompleted(false);
    setDesignImage(null);
  };

  const saveAsPNG = () => {
    if (!canvas) return;
    canvas.discardActiveObject();
    canvas.renderAll();
    const dataURL = canvas.toDataURL({ format: "png", quality: 1 });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "creare-design.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isLoadingCanvas = isBackgroundLoading || isImageLoading;

  return (
    <div className="min-h-screen bg-[#F7F7F7] px-4 pb-20 pt-28 lg:px-10">
      <div className="container mx-auto">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: tools */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Design Your Own Product
              </h1>
              <p className="mt-2 text-gray-500">
                Customize the {category?.name || "product"} with your own text
                and images.
              </p>
            </div>

            {/* Mode toggle */}
            <div className="flex w-full rounded-xl bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setMode("add-text")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-3 font-semibold transition-all ${
                  mode === "add-text"
                    ? "bg-white text-[#00ADB5] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FaTextHeight size={20} />
                <span>Text</span>
              </button>
              <button
                type="button"
                onClick={() => setMode("add-image")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-3 font-semibold transition-all ${
                  mode === "add-image"
                    ? "bg-white text-[#00ADB5] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FaFileAlt size={18} />
                <span>Image</span>
              </button>
            </div>

            {mode === "add-text" && (
              <div className="grid gap-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                {/* Text Preview Box */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Live Preview
                  </label>
                  <div className="flex min-h-[120px] items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-6 transition-all">
                    {textInfo.text.trim() ? (
                      <span
                        style={{
                          fontFamily: textInfo.font,
                          color: textInfo.color,
                          fontWeight: textInfo.fontWeight,
                          letterSpacing: `${textInfo.charSpacing}px`,
                          backgroundColor: activeBackground
                            ? textInfo.bgColor
                            : "transparent",
                          padding: activeBackground ? "0.1em 0.3em" : "0",
                          borderRadius: "4px",
                          fontSize: "40px", // Match canvas font size
                          textAlign: "center",
                          wordBreak: "break-word",
                          maxWidth: "100%",
                          display: "inline-block",
                          lineHeight: "1.16", // Match Fabric.js default line-height
                        }}
                      >
                        {textInfo.text}
                      </span>
                    ) : (
                      <span className="text-sm italic text-gray-400">
                        Type something to see preview...
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label
                      htmlFor="text"
                      className="text-sm font-medium text-gray-700"
                    >
                      Text
                    </label>
                    <input
                      id="text"
                      name="text"
                      placeholder="Enter your text"
                      value={
                        selectedObject ? selectedObject.text : textInfo.text
                      }
                      onChange={handleTextChange}
                      className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/20"
                    />
                  </div>

                  <div className="relative grid gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Font
                    </label>
                    <button
                      type="button"
                      onClick={toggleFontDropdown}
                      className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 transition hover:border-gray-400"
                    >
                      <span style={{ pointerEvents: "none" }}>
                        {selectedObject
                          ? selectedObject.fontFamily
                          : textInfo.font}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform ${isFontOpen ? "rotate-180" : ""}`}
                      >
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </button>
                    {isFontOpen && (
                      <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-auto rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                        {FONT_OPTIONS.map((option) => {
                          const isActive =
                            selectedObject &&
                            selectedObject.fontFamily === option;
                          return (
                            <button
                              type="button"
                              key={option}
                              onClick={() => handleOptionClick(option)}
                              className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition ${
                                isActive
                                  ? "bg-[#00ADB5] text-white"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              <span style={{ fontFamily: option }}>
                                {option}
                              </span>
                              {isActive && <span>&#10003;</span>}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">
                      Color
                    </span>
                    <label
                      htmlFor="color"
                      className="h-9 w-9 cursor-pointer rounded-md border border-gray-300 shadow-sm"
                      style={{
                        backgroundColor: selectedObject
                          ? selectedObject.fill
                          : textInfo.color,
                      }}
                    ></label>
                  </div>

                  {selectedObject && selectedObject.type === "text" && (
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700">
                        Background
                      </span>
                      <input
                        type="checkbox"
                        checked={activeBackground}
                        onChange={(e) =>
                          handleActiveBackgroundChange(e.target.checked)
                        }
                        className="h-4 w-4 accent-[#00ADB5]"
                      />
                      {activeBackground && (
                        <label
                          htmlFor="bgColor"
                          className="h-9 w-9 cursor-pointer rounded-md border border-gray-300 shadow-sm"
                          style={{
                            backgroundColor: selectedObject.backgroundColor
                              ? selectedObject.backgroundColor
                              : textInfo.bgColor,
                          }}
                        ></label>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Letter Spacing
                    </span>
                    <span className="text-sm text-gray-400">
                      {selectedObject
                        ? selectedObject.charSpacing
                        : Number(textInfo.charSpacing)}{" "}
                      px
                    </span>
                  </div>
                  <input
                    type="range"
                    name="charSpacing"
                    min={0}
                    max={300}
                    step={25}
                    value={
                      selectedObject
                        ? selectedObject.charSpacing
                        : Number(textInfo.charSpacing)
                    }
                    onChange={handleTextChange}
                    className="w-full accent-[#00ADB5]"
                  />
                </div>

                <div className="grid gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Font Weight
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {FONT_WEIGHT_OPTIONS.map((font) => (
                      <button
                        type="button"
                        key={font}
                        onClick={() => handleFontWeight(font)}
                        className={`rounded-lg border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                          font === textInfo.fontWeight
                            ? "border-[#00ADB5] bg-[#00ADB5] text-white shadow-md shadow-[#00ADB5]/20"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {font}
                      </button>
                    ))}
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

                <button
                  type="button"
                  onClick={addText}
                  disabled={!textInfo.text.trim()}
                  className="w-full rounded-xl bg-[#222222] px-4 py-3 font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Add Text
                </button>
              </div>
            )}

            {mode === "add-image" && (
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <label
                  htmlFor="upload-design"
                  className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-gray-300 p-10 text-center transition hover:border-[#00ADB5] hover:bg-[#00ADB5]/5"
                >
                  {isImageLoading ? (
                    <>
                      <Spin size="large" />
                      <p className="text-sm text-gray-500">
                        Uploading your image...
                      </p>
                    </>
                  ) : (
                    <>
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
                        className="h-10 w-10 text-[#00ADB5]"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      <p className="text-gray-500">
                        Drag and drop your design or{" "}
                        <span className="font-medium text-[#00ADB5]">
                          browse files
                        </span>
                      </p>
                      <p className="text-xs text-gray-400">PNG, JPG or SVG</p>
                    </>
                  )}
                </label>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {selectedObject && (
                <div className="flex flex-wrap gap-2 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                  <button
                    type="button"
                    onClick={bringForward}
                    title="Bring Forward"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 hover:text-[#00ADB5]"
                  >
                    <MdArrowUpward size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={sendBackwards}
                    title="Send Backward"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 hover:text-[#00ADB5]"
                  >
                    <MdArrowDownward size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={centerObject}
                    title="Center Object"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 hover:text-[#00ADB5]"
                  >
                    <MdCenterFocusStrong size={20} />
                  </button>
                  <div className="mx-1 w-px bg-gray-200" />
                  <button
                    type="button"
                    onClick={deleteSelectedObject}
                    title="Delete Selected"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 transition hover:bg-red-100"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              )}

              <Popconfirm
                title="Clear canvas"
                description="Are you sure you want to clear all design elements?"
                onConfirm={clearCanvas}
                okText="Yes"
                cancelText="No"
              >
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-red-500"
                >
                  <MdDeleteSweep size={20} />
                  <span>Clear All</span>
                </button>
              </Popconfirm>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              id="upload-design"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Right: preview */}
          <div className="flex h-fit flex-col gap-6 lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="relative flex min-h-[400px] w-full items-center justify-center overflow-hidden rounded-xl bg-[#F7F7F7]">
                <canvas ref={canvasRef} />
                {isLoadingCanvas && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/70">
                    <Spin size="large" />
                    <span className="text-sm font-medium text-gray-600">
                      {isBackgroundLoading
                        ? "Loading canvas..."
                        : "Uploading your image..."}
                    </span>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-100 p-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  Preview Your Design
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  See how your design will look on the{" "}
                  {category?.name || "product"}.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {!completed ? (
                <button
                  type="button"
                  onClick={saveDesign}
                  disabled={isCompleting || !canvas || isBackgroundLoading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#222222] px-5 py-3 font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCompleting ? <Spin size="small" /> : <FaCheck size={18} />}
                  <span>
                    {isCompleting ? "Completing..." : "Complete Design"}
                  </span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setVariantsOpen(true)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#00ADB5] px-5 py-3 font-medium text-white transition hover:bg-[#248287]"
                  >
                    <FaCartPlus size={18} />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleEditAgain}
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    Edit
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={saveAsPNG}
                disabled={!canvas}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <MdSaveAlt size={18} />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddDesignedCart
        variantsOpen={variantsOpen}
        handleCancel={handleCancel}
        category={category}
        design={designImage}
      />
    </div>
  );
};

export default Preview;
