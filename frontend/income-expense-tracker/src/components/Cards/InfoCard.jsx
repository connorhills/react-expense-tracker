import React from "react";

const InfoCard = ({
  icon,
  label,
  value,
  color,
  borderColor,
  shadowColor,
  textColor,
  outlineColor,
}) => {
  return (
    <div
      className={`flex gap-6 bg-card-background p-6 rounded-3xl shadow-md ${shadowColor} border-3 ${borderColor} border-opacity-50`}
    >
      <div
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl outline-5 ${outlineColor}`}
      >
        {icon}
      </div>
      <div>
        <h6 className={`text-lg font-medium ${textColor} mb-1`}>{label}</h6>
        <span className="text-[22px]">${value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
