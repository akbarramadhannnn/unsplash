import React, { memo } from "react";

const Input = ({ value, placeholder, onChange = () => {} }) => {
  return (
    <input
      className="border w-full h-[40px] px-[20px] mr-[5px]"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default memo(Input);
