import { useEffect, useRef } from "react";

function toggleFullScreen(el) {
  if (!el.fullscreenElement) {
    el.requestFullscreen();
  } else {
    if (el.exitFullscreen) {
      el.exitFullscreen();
    }
  }
}

export const useFullScreen = () => {
  const ref = useRef();
  const handleFullScreenKey = (event) => {
    if (event.keyCode === 122) {
      event.preventDefault();
      toggleFullScreen(ref.current);
    }
  };
  useEffect(() => {
    if (ref) {
      document.addEventListener("keydown", handleFullScreenKey);
    }
    return () => document.removeEventListener("keydown", handleFullScreenKey);
  }, [ref]);
  return ref;
};
