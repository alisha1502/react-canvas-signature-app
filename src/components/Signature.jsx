import React, { useState, useRef } from "react";
import ColorPicker from "./ColorPicker ";
import Canvas from "./Canvas";
import Controls from "./Controls";
import '../styles/Signature.css'

function Signature() {
  const [color, setColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState("5");
  const [history, setHistory] = useState([]);
  const canvasRef = useRef(null);

  // Refs to store initial values
  const initialColor = useRef(color);
  const initialBackgroundColor = useRef(backgroundColor);
  const initialFontSize = useRef(fontSize);

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  const handleBackgroundColorChange = (newBackgroundColor) => {
    setBackgroundColor(newBackgroundColor);
  };

  const handleFontSizeChange = (newFontSize) => {
    setFontSize(newFontSize);
  };

  const handleClear = () => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Reset color picker, background color, and font size to initial values
    setColor(initialColor.current);
    setBackgroundColor(initialBackgroundColor.current);
    setFontSize(initialFontSize.current);
    setHistory([]);
  };

  const handleSave = () => {
    const canvas = document.getElementById("myCanvas");
    const link = document.createElement("a");
    link.download = "my-canvas.png";
    link.href = canvas.toDataURL();
    localStorage.setItem("canvasContents", link.href);
    link.click();
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const updatedHistory = [...history];
      updatedHistory.pop();
      setHistory(updatedHistory);
      canvasRef.current.redrawCanvas(updatedHistory);
    }
  };

  return (
    <div className="container mx-auto">
      <div className=" flex items-center justify-center">
        <div className="flex flex-col items-center mt-6">
          <div className="flex flex-wrap justify-between w-full">
            <ColorPicker
              label="Text color picker"
              value={color}
              onChange={handleColorChange}
            />
            <ColorPicker
              label="Background"
              value={backgroundColor}
              onChange={handleBackgroundColorChange}
            />
            <div className="flex flex-col w-1/4">
              <p className="mb-2 text-center">Font size</p>
              <select
                className="form-select w-full h-10 px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                value={fontSize}
                onChange={(e) => handleFontSizeChange(e.target.value)}
              >
                <option value="5">5px</option>
                <option value="10">10px</option>
                <option value="20">20px</option>
                <option value="30">30px</option>
                <option value="40">40px</option>
                <option value="50">50px</option>
              </select>
            </div>
          </div>

          <Canvas
           ref={canvasRef}
            color={color}
            backgroundColor={backgroundColor}
            fontSize={fontSize}
            history={history}
            setHistory={setHistory}
          />

          <Controls
            onClear={handleClear}
            onSave={handleSave}
            onUndo={handleUndo}
          />
        </div>
      </div>
    </div>
  );
}

export default Signature;
