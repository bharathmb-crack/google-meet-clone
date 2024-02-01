import { useState, useRef, useEffect } from "react";

const useMediaStream = () => {
  const [state, setState] = useState(null);
  const isStreamAlreadySet = useRef(false);

  useEffect(() => {
    if (isStreamAlreadySet.current) return;
    isStreamAlreadySet.current = true;
    (async function initStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        console.log("setting up the navigator");
        setState(stream);
      } catch (e) {
        console.log("Error in media navigator", e);
      }
    })();
  }, []);

  return {
    stream: state,
  };
};

export default useMediaStream;
