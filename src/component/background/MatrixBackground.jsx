import React, { useEffect, useRef } from "react";

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to fill the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const w = canvas.width;
    const h = canvas.height;
    const columns = Math.floor(w / 20) + 1; // Number of columns based on font size
    const drops = Array(columns).fill(1); // Array to track the position of each column

    // Function to draw the matrix effect
    const drawMatrix = () => {
      // Draw a semi-transparent black rectangle to create the trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, w, h);

      // Set the font and style for the characters
      ctx.fillStyle = "#0f0"; // Green text color
      ctx.font = "16px monospace";

      // Loop through each column and draw the characters
      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() < 0.5 ? "1" : "0"; // Randomly choose '1' or '0'
        ctx.fillText(text, i * 20, drops[i] * 20); // Draw the character at the current position

        // Reset the drop if it reaches the bottom of the screen
        if (drops[i] * 20 > h && Math.random() > 0.975) {
          drops[i] = 0; // Reset to the top
        }

        // Move the drop down
        drops[i]++;
      }
    };

    // Start the animation loop
    const interval = setInterval(drawMatrix, 33); // ~30 FPS

    // Cleanup function to stop the animation when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -2, // Ensure it stays in the background
      }}
    />
  );
};

export default MatrixBackground;