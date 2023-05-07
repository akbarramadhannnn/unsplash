import React, { memo, useCallback, useState, Fragment } from "react";

const Image = ({ src = "", alt = "", className }) => {
  const [isLoaded, setIsLoaded] = useState(true);

  const onLoadImage = useCallback(() => {
    setIsLoaded(false);
  }, []);

  return (
    <Fragment>
      <div
        className={`${className ? className : "w-full h-full"} ${
          isLoaded ? "block" : "hidden"
        }`}
        style={{
          background: "rgba(0, 0, 0, 0.05)",
        }}
      />

      <img
        className={`${className ? className : "object-fill w-full h-full"} ${
          isLoaded ? "hidden" : "block"
        }`}
        alt={alt}
        src={src}
        onLoad={onLoadImage}
      />
    </Fragment>
  );
};

export default memo(Image);
