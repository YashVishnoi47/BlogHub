const flashMessage = document.querySelector('.flash10');

if (flashMessage) {
  // Set a timeout to hide the flash message after 10 seconds
  setTimeout(() => {
    flashMessage.style.transition = 'opacity 0.5s'; // Optional: Add smooth fade out
    flashMessage.style.opacity = 0;
    
    // After the fade-out, hide the element completely
    setTimeout(() => {
      flashMessage.style.display = 'none';
    }, 500); // Matches the duration of the fade-out
  }, 3000); // 3 seconds delay
}