"use client";
import { useEffect, useRef } from "react";

const RefreshOnFirstLoad = () => {
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const alreadyReloaded = sessionStorage.getItem("reloaded");

    if (!alreadyReloaded) {
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    }
    if (PathnameContext.pathname === "/account" && alreadyReloaded) {
      // localStorage.removeItem("hasReloadedd");
      return;
    } else if (PathnameContext.pathname === "/account" && !alreadyReloaded) {
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    } else {
      sessionStorage.removeItem("reloaded"); // reset for next visit
    }
  }, []);

  return null;
};

export default RefreshOnFirstLoad;
