import React, { memo } from "react";

const Button = ({ onClick = () => {}, label, className }) => {
  return (
    <button
      className={`mt-[20px] border py-[10px] p-[30px] ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default memo(Button);
