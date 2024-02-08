// JS Goes here - ES6 supported


import "./css/main.scss";



// A fix to add a font because of webpack acting up.
const style = document.createElement('style');
style.type = 'text/css';
const fontFaceRule = `
@font-face {
  font-family: 'PalestineTitle';
  src: url('/fonts/Palestine-Regular.otf') format('opentype'),
       url('/fonts/Palestine-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}`;

// Check if the style element can use the `styleSheet` property (IE) or not
if (style.styleSheet) {
  style.styleSheet.cssText = fontFaceRule;
} else {
  style.appendChild(document.createTextNode(fontFaceRule));
}

// Append the style element to the head of the document
document.head.appendChild(style);




// a script to move the images around on the homepage
document.addEventListener('DOMContentLoaded', () => {

    const postImages = document.querySelectorAll('.post-image');
  
    postImages.forEach((element) => {
      // Ensure the transition is smooth
      element.style.transition = 'background-position 10s ease-in-out';
  
      // Start with the initial position
      let xPosition = 50;
      let yPosition = 50;
  
      // Function to update background position
      const updateBackgroundPosition = () => {
        // Adjust position by a certain percentage, allowing for both positive and negative changes
        xPosition += (Math.random() * 2 - 1) * 50; // Adjusts by up to 10%, can be negative or positive
        yPosition += (Math.random() * 2 - 1) * 50; // Adjusts by up to 10%, can be negative or positive
  
        // Ensure positions are within bounds
        xPosition = Math.max(0, Math.min(100, xPosition));
        yPosition = Math.max(0, Math.min(100, yPosition));
  
        // Update the element's background position
        element.style.backgroundPosition = `${xPosition}% ${yPosition}%`;
      };
  
      // Adjusts the background position every 3 seconds
      setInterval(updateBackgroundPosition, 10000);
    });
  });


  
  
console.log("🦊 Hello! Edit me in src/index.js");
