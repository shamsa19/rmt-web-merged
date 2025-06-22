// Alert.tsx
import React, { useEffect } from "react";

type AlertType = "error" | "success";

interface AlertProps {
  message: string;
  type: AlertType;
  onDismiss?: () => void;
  duration?: number; // Duration in milliseconds, defaults to 3000ms
}

const Alert: React.FC<AlertProps> = ({
  message,
  type,
  onDismiss,
  duration = 3000,
}) => {
  const bgColor = type === "error" ? "bg-red-50" : "bg-green-50";
  const borderColor = type === "error" ? "border-red-400" : "border-green-400";
  const textColor = type === "error" ? "text-red-700" : "text-green-700";

  useEffect(() => {
    if (!onDismiss) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [onDismiss, duration]);

  return (
    <div className={`${bgColor} border-l-4 ${borderColor} p-4 mb-6`}>
      <p className={`text-sm ${textColor}`}>{message}</p>
    </div>
  );
};

export default Alert;
