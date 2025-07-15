import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RefreshOnFirstLoad = () => {
  const router = useRouter();

  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem("hasRefreshed");

    if (!hasRefreshed) {
      sessionStorage.setItem("hasRefreshed", "true");
      // Option 1: Refresh using Next.js router (soft refresh)
      router.refresh();

      // Option 2: Hard reload
      window.location.reload();
    }
  }, []);

  return null;
};

export default RefreshOnFirstLoad;
