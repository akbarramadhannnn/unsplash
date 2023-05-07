import React, { Fragment, memo, useEffect } from "react";
import { Image } from "components/atoms";
import CloseIcon from "assets/images/close.png";

const Modal = ({ isOpen, data, onClose = () => {} }) => {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <Fragment>
      {isOpen ? (
        <div
          className={`bg-black1 fixed inset-0 z-50 outline-none focus:outline-none p-[20px] flex flex-col justify-center`}
        >
          <div className="flex justify-end mb-[20px]">
            <button onClick={onClose}>
              <img
                src={CloseIcon}
                alt="Close Icon"
                className="w-[40px] h-[40px]"
              />
            </button>
          </div>

          <div className="relative min-h-[200px] lg:h-[700px] w-full rounded-[20px] bg-white overflow-y-auto p-[20px] lg:p-[40px]">
            <Image
              className="w-full h-full lg:w-auto lg:h-auto lg:object-cover"
              src={data.urls.full}
              alt={data.alt_description}
            />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default memo(Modal);
