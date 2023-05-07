import React, { memo } from "react";

const TextError = ({ message, align = "left" }) => {
  return (
    <p className={`mt-[3px] text-[red] ${align === "left" ? "text-left" : "text-center"}`}>
      {message}
    </p>
  );
};

export default memo(TextError);
