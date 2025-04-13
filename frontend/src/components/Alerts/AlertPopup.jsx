import React, { useEffect } from "react";
import SuccessGif from "../../assets/images/success.gif";
import ErrorGif from "../../assets/images/failure.gif";

const AlertPopup = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  var gifSrc;
  if(type === "failure") gifSrc = ErrorGif;
  else gifSrc = SuccessGif;
  
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg border rounded-md z-50 p-5 w-72 text-center">
      <img src={gifSrc} alt={type} className="w-20 mx-auto mb-3" />
      <p className="text-lg font-medium text-gray-800">{message}</p>
    </div>
  );
};

export default AlertPopup;
