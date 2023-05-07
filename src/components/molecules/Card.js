import React, { memo } from "react";
import { Image } from "components/atoms";
import Heart1Icon from "assets/images/heart-1.png";
import Heart2Icon from "assets/images/heart-2.png";

const Card = ({
  dataPhotos = [],
  listLove = [],
  onClickLove = () => {},
  onClickImage = () => {},
}) => {
  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {dataPhotos.map((d, i) => {
        const isLove = listLove.map((d) => d.photoId).includes(d.id);
        return (
          <li className="border pb-[20px]" key={i}>
            <div
              className="relative h-[300px] group hover:cursor-zoom-in"
              onClick={() => onClickImage(d)}
            >
              <Image
                className={"object-cover w-full h-full"}
                src={d.urls.regular}
                alt={d.description}
              />

              <div className="absolute top-0 bg-black1 group-hover:h-full group-hover:w-full" />
            </div>

            <div className="flex justify-between items-center mt-[20px] px-[10px]">
              <div className="flex items-center w-[75%]">
                <Image
                  className="w-10 h-10 rounded-full mr-[10px]"
                  src={d.user.profile_image.large}
                  alt={d.user.name}
                />
                <p>{d.user.name}</p>
              </div>

              <div className="flex justify-end w-[20%]">
                <button className="mr-[10px]" onClick={() => onClickLove(d)}>
                  <img
                    src={isLove ? Heart2Icon : Heart1Icon}
                    alt="Heart Icon"
                    className="w-[25px] h-[25px] "
                  />
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default memo(Card);
