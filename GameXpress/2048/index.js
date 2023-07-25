const text = "LET'S PLAY ...."; // The text to be animated
const typingSpeed = 100; // Adjust the typing speed (in milliseconds)

let charIndex = 0;
const typingEffect = document.getElementById("play");

function typeText() {
  if (charIndex < text.length) {
    typingEffect.textContent += text.charAt(charIndex);
    charIndex++;
   setTimeout(typeText, typingSpeed);

  }
}

// Start the typing animation
typeText();

