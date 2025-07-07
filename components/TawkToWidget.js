// "use client";
// import { useEffect } from "react";

// export default function TawkToWidget() {
//   useEffect(() => {
//     var Tawk_API = Tawk_API || {},
//       Tawk_LoadStart = new Date();
//     (function () {
//       var s1 = document.createElement("script");
//       s1.async = true;
//       s1.src = "https://embed.tawk.to/686bb0dca86aec190ca6b4f4/1ivialoc3";
//       s1.charset = "UTF-8";
//       s1.setAttribute("crossorigin", "*");
//       document.body.appendChild(s1);
//     })();
//   }, []);

//   return null;
// }

"use client";
import { useEffect } from "react";

export default function TawkToWidget() {
  useEffect(() => {
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = "https://embed.tawk.to/686bb0dca86aec190ca6b4f4/1ivialoc3";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    document.body.appendChild(s1);

    return () => {
      // Remove existing Tawk.to iframe when component unmounts
      const tawkIframe = document.querySelector("iframe[src*='tawk.to']");
      if (tawkIframe) {
        tawkIframe.remove();
      }
    };
  }, []);

  return null;
}
