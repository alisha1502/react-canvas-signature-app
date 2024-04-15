import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

const Canvas = forwardRef(
  ({ color, backgroundColor, fontSize, history, setHistory }, ref) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);
    const [isDrawingOccured, setIsDrawingOccured] = useState(false);

    useEffect(() => {
      // Effect for handling the resize event
      const handleResize = () => {
        const canvas = canvasRef.current;
        if (window.innerWidth < 803) {
          canvas.width = window.innerWidth - 20;
          canvas.height = 300;
        } else {
          canvas.width = 945;
          canvas.height = 400;
        }
      };
    
      window.addEventListener("resize", handleResize);
    
      // Cleanup the event listener when the component is unmounted
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []); // Empty dependency array ensures this effect only runs on mount and unmount
    
    useEffect(() => {
      // Effect for canvas initialization and update when colors or size change
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
    
      // Set initial stroke style to the selected color
      ctx.strokeStyle = color;
      ctx.lineCap = "round";
      ctx.lineWidth = fontSize;
    
      // Fill canvas with the selected background color
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, [color, backgroundColor, fontSize]);
  
    const saveDrawingAction = () => {
      if (isDrawingOccured) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Save the current content to history array
        setHistory([...history, canvas.toDataURL()]);
      }
    };

    const handleMouseDown = (event) => {
      setIsDrawing(true);
      setIsDrawingOccured(true);
      setLastX(event.nativeEvent.offsetX);
      setLastY(event.nativeEvent.offsetY);
    };

    const handleMouseMove = (event) => {
      if (!isDrawing) return;
      const ctx = canvasRef.current.getContext("2d");

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      ctx.stroke();

      setLastX(event.nativeEvent.offsetX);
      setLastY(event.nativeEvent.offsetY);
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
      setIsDrawingOccured(false);
      saveDrawingAction();
    };

    useImperativeHandle(ref, () => ({
      redrawCanvas: (drawingHistory) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawingHistory.forEach((dataUrl) => {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0);
          };
          img.src = dataUrl;
        });
      },
    }));

    return (
      <div>
        <canvas
          ref={canvasRef}
          className="canvas border-2 border-black"
          id="myCanvas"
          width="800"
          height="400"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseOut={handleMouseUp}
          onMouseUp={handleMouseUp}
          onContextMenu={(e) => e.preventDefault()}
        ></canvas>

        <div></div>
      </div>
    );
  }
);

export default Canvas;
