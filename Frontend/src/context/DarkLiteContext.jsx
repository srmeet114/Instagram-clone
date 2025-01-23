import React, { createContext, useState, useContext, useEffect } from "react";

const DarkLiteContext = createContext();

export const useDarkLite = () => useContext(DarkLiteContext);

export const DarkLiteProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkLiteContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkLiteContext.Provider>
  );
};