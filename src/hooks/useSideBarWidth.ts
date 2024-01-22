import { useEffect, useState } from "react";
import { useWindowResize } from "./useWindowResize";

export const useSideBarWidth = () => {
  const [sideBarWidth, setSideBarWidth] = useState(
    window.innerWidth <= 1024
      ? 80
      : window.innerWidth <= 1280 && window.innerWidth > 1204
      ? 200
      : window.innerWidth <= 1440 && window.innerWidth > 1280
      ? 220
      : 260
  );
  const width = useWindowResize();

  useEffect(() => {
    if (width <= 1024) {
      setSideBarWidth(80);
    } else if (width <= 1280 && width > 1024) {
      setSideBarWidth(200);
    } else if (width <= 1440 && width > 1280) {
      setSideBarWidth(220);
    } else {
      setSideBarWidth(260);
    }
  }, [width]);

  return [sideBarWidth, setSideBarWidth];
};
