import React from "react";

function Controls({ onClear, onSave, onUndo }) {
  const handleUndoClick = () => {
    if (typeof onUndo === "function") {
      onUndo();
    }
  };

  const handleRetrieve = () => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const savedCanvas = localStorage.getItem("canvasContents");

    if (savedCanvas) {
      const img = new Image();
      img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.drawImage(img, 0, 0); // Draw the image onto the cleared canvas
      };
      img.src = savedCanvas;
    } else {
      console.log("No saved canvas found.");
    }
  };

  return (
    <div className="flex flex-wrap mt-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={onClear}
      >
        Clear
      </button>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={onSave}
      >
        Save & Download
      </button>

      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        onClick={handleUndoClick}
      >
        Undo
      </button>
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleRetrieve}
      >
        Retrieve saved signature
      </button>
    </div>
  );
}

export default Controls;
