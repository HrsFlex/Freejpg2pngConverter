document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const convertToPNGButton = document.getElementById('convertToPNG');
    const convertToJPGButton = document.getElementById('convertToJPG');
    const resultDiv = document.getElementById('result');
  
    convertToPNGButton.addEventListener('click', function() {
      convertImage('png');
    });
  
    convertToJPGButton.addEventListener('click', function() {
      convertImage('jpg');
    });
  
    function convertImage(format) {
      const file = fileInput.files[0];
      if (!file) {
        alert('Please select an image file.');
        return;
      }
  
      const reader = new FileReader();
      reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function() {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const convertedImage = canvas.toDataURL(`image/${format}`);
  
        
          const downloadLink = document.createElement('a');
          downloadLink.href = convertedImage;
          downloadLink.download = `converted_image.${format}`;
          downloadLink.textContent = `Download ${format.toUpperCase()}`;
  
          resultDiv.innerHTML = '';
          resultDiv.appendChild(downloadLink);
        };
      };
      reader.readAsDataURL(file);
    }
  });
// Add this function to display the image preview
function displayImagePreview(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const previewImage = document.getElementById('previewImage');
      previewImage.src = event.target.result;
      previewImage.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
  
  // Add this event listener to trigger image preview on file selection
  fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];
    if (file) {
      const fileInfo = document.getElementById('fileInfo');
      fileInfo.textContent = `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
      displayImagePreview(file);
    }
  });
    