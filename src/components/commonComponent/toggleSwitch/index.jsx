import React from "react";

const ToggleSwitch = ({ isChecked, onToggle }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <span
        className={`mr-3 text-sm font-medium ${
          isChecked ? "text-green-500" : "text-gray-500"
        }`}
      >
        {isChecked ? "English" : "Regional"}
      </span>
      <div className="relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
          className="sr-only"
        />
        <div className="block w-10 h-6 bg-gray-300 rounded-full shadow-inner"></div>
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-blue-500 rounded-full shadow transform transition-transform ${
            isChecked ? "translate-x-full" : "translate-x-0"
          }`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
