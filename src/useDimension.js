import { useEffect, useCallback, useRef, useState } from "react";

function useDimensions() {
  const ref = useRef(null);
  const [{ width, height }, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const update = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const { width: newWidth, height: newHeight } = ref.current.getBoundingClientRect();
    if (newWidth === width && newHeight === height) {
      return;
    }

    setDimensions({ width: newWidth, height: newHeight });
  }, [width, height]);

  const setRef = useCallback((node) => {
    setDimensions({
      width: node.clientWidth,
      height: node.clientHeight,
    });
    ref.current = node;
  }, []);

  useEffect(() => {
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return [setRef, { width, height }];
}

export default useDimensions;
