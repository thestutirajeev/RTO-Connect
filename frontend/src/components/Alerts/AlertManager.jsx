import React, { useState, createContext, useContext } from "react";
import AlertPopup from "./AlertPopup";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <AlertPopup
          type={alert.type}
          message={alert.message}
          onClose={hideAlert}
        />
      )}
    </AlertContext.Provider>
  );
};
