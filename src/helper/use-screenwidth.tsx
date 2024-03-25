"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useGetWindowsWidth() {
  const dispatch = useDispatch();
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    // console.log("window width", window.innerWidth);
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowSizeChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  return {
    screenWidth,
  };
}
