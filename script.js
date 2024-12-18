let img = new Image(); // Global image variable to store the uploaded image

// Function to toggle theme
function toggleTheme() {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');

  if (body.classList.contains('light-theme')) {
    body.classList.replace('light-theme', 'dark-theme');
    themeToggle.textContent = 'Light Mode';
  } else {
    body.classList.replace('dark-theme', 'light-theme');
    themeToggle.textContent = 'Dark Mode';
  }
}

// Function to handle file selection
function handleFileSelect() {
  const fileInput = document.getElementById('imageInput');
  const imagePreview = document.getElementById('imagePreview');
  const convertSection = document.querySelector('.convert-section');
  const downloadLink = document.getElementById('downloadLink');
  
  if (fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
      img.src = event.target.result;
      img.onload = function() {
        // Display image preview
        imagePreview.innerHTML = `<img src="${img.src}" alt="Uploaded image">`;
        
        // Show convert section and hide download link
        convertSection.style.display = 'flex';
        downloadLink.style.display = 'none';
      };
    };
    
    reader.readAsDataURL(file);
  } else {
    alert('Please select an image file to upload.');
  }
}

// Function to convert the uploaded image to the selected format
function convertImage() {
  const canvas = document.getElementById('canvas');
  const downloadLink = document.getElementById('downloadLink');
  const formatSelect = document.getElementById('formatSelect');
  
  if (img.src) {
    // Set canvas size to the uploaded image's size
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image onto the canvas
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Convert the canvas content to the selected format
    const selectedFormat = formatSelect.value;
    const convertedImageUrl = canvas.toDataURL(selectedFormat, 0.9);
    
    // Update download link
    downloadLink.href = convertedImageUrl;
    downloadLink.download = `converted-image.${selectedFormat.split('/')[1]}`;
    downloadLink.style.display = 'inline-block';
    downloadLink.textContent = `Download ${selectedFormat.split('/')[1].toUpperCase()}`;
  } else {
    alert('Please upload an image first.');
  }
}
