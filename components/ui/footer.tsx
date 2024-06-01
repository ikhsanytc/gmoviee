"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";

function Footer() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const closeFooter = localStorage.getItem("closeFooter");
    if (closeFooter === "true") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [show]);
  const handleCloseFooter = () => {
    localStorage.setItem("closeFooter", "true");
    setShow(false);
  };
  return (
    <>
      {show && (
        <div className="fixed bottom-0 shadow border-t-2 left-0 bg-white dark:bg-gray-800 p-3 rounded-r w-full bg-opacity-80 backdrop-filter backdrop-blur hidden md:flex justify-between items-center">
          <h1 className="font-bold text-xl">Created By Ikhsan.</h1>
          <Button onClick={handleCloseFooter}>Close</Button>
        </div>
      )}
    </>
  );
}

export default Footer;
