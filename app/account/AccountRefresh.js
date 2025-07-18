import { useEffect, useRef, useContext } from "react";
import { usePathname } from "next/navigation";

const useAccountReload = () => {
  const ran = useRef(false);

  const pathname = usePathname();

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const alreadyReloaded = sessionStorage.getItem("accountReloaded");

    // Reload once if on /account and not already reloaded
    if (pathname === "/account" && !alreadyReloaded) {
      sessionStorage.setItem("accountReloaded", "true");
      window.location.reload();
    }

    // If not on /account, reset the reload flag
    if (pathname !== "/account") {
      sessionStorage.removeItem("accountReloaded");
    }
  }, [pathname]);
};

export default useAccountReload;
