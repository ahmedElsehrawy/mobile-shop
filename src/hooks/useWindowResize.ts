import { useEffect, useState } from "react";

export const useWindowResize = () => {
  const [widthSize, setWidthSize] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setTimeout(() => {
        setWidthSize(window.innerWidth);
      }, 1000);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setTimeout(() => {
          setWidthSize(window.innerWidth);
        }, 1000);
      });
    };
  }, []);

  return widthSize;
};
