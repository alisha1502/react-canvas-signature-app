import React from "react";
import '../styles/ColorPicker.css'

function ColorPicker({ label, value, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value); // Call the onChange function with the new color value
  };

  return (
    <div className="flex flex-col w-1/4">
      <p className="mb-2 text-center">{label}</p>
      <input
        className="w-full h-10 px-4 py-2 mb-4 leading-normal bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:border-gray-600"
        type="color"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default ColorPicker;
