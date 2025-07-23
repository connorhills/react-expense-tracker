import React from "react";
import { getInitials } from "../../utils/helper";

export const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div
      className={`${width || "w-12"} ${height || "h-12"} ${
        style || ""
      } flex items-center justify-center rounded-full text-secondary font-medium bg-gray-500/20`}
    >
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;
