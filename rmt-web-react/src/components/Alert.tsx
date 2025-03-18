// Alert.tsx
import React from "react";

type AlertType = "error" | "success";

interface AlertProps {
  message: string;
  type: AlertType;
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  const bgColor = type === "error" ? "bg-red-50" : "bg-green-50";
  const borderColor = type === "error" ? "border-red-400" : "border-green-400";
  const textColor = type === "error" ? "text-red-700" : "text-green-700";

  return (
    <div className={`${bgColor} border-l-4 ${borderColor} p-4 mb-6`}>
      <p className={`text-sm ${textColor}`}>{message}</p>
    </div>
  );
};

export default Alert;
