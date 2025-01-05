import { saveAs } from "file-saver";

export const downloadGradientAsPNG = (colors, displayText,textColor,font) => {
  console.log({font})
   // Create the SVG content
   const svgContent = `
   <svg xmlns="http://www.w3.org/2000/svg" width="600" height="320">
     <defs>
     
       <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
         ${colors.map(
           (color, index) => `
           <stop offset="${(index / (colors.length - 1)) * 100}%" stop-color="${color}" />
         `
         ).join("")}
       </linearGradient>
     </defs>
      <path 
          d="M16 0 H568 C586.778 0 600 13.222 600 16 V288 C600 306.778 586.778 320 568 320 H32 C13.222 320 0 306.778 0 288 V32 C0 13.222 13.222 0 16 0 Z"
          fill="url(#gradient)"
        />
     <text x="50%" y="50%" text-anchor="middle" fill="${textColor}" font-size="50" font-weight ="bold" font-family="${font? font : "sans"}" dy=".3em">
       ${displayText}
     </text>
   </svg>
 `;

 // Create a Blob from the SVG content
 const svgBlob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
 const url = URL.createObjectURL(svgBlob);

 // Create an Image object to load the SVG
 const img = new Image();
 img.onload = () => {
   // Create a canvas element
   const canvas = document.createElement('canvas');
   canvas.width = 600;
   canvas.height = 320;
   
   
   // Get the canvas context and draw the image
   const ctx = canvas.getContext('2d');
   ctx.drawImage(img, 0, 0);
   
   // Convert canvas to PNG and download
   canvas.toBlob((pngBlob) => {
     // Create a download link
     const downloadLink = document.createElement('a');
     const downloadUrl = URL.createObjectURL(pngBlob);
     downloadLink.href = downloadUrl;
     downloadLink.download = 'gradient.png';
     
     // Trigger download
     document.body.appendChild(downloadLink);
     downloadLink.click();
     document.body.removeChild(downloadLink);
     
     // Clean up
     URL.revokeObjectURL(downloadUrl);
     URL.revokeObjectURL(url);
   }, 'image/png');
 };

 // Set the image source to the SVG blob URL
 img.src = url;
};