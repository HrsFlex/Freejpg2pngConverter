document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('fileInput');
  const convertToPNGButton = document.getElementById('convertToPNG');
  const convertToJPGButton = document.getElementById('convertToJPG');
  const imagePreview = document.getElementById('imagePreview');
  const previewImage = document.getElementById('previewImage');
  const fileInfo = document.getElementById('fileInfo');

  fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];
    if (file) {
      fileInfo.textContent = `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
      const reader = new FileReader();
      reader.onload = function(event) {
        previewImage.src = event.target.result;
        imagePreview.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    }
  });

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

        // Create a download link for the converted image
        const downloadLink = document.createElement('a');
        downloadLink.href = convertedImage;
        downloadLink.download = `converted_image.${format}`;
        downloadLink.textContent = `Download ${format.toUpperCase()}`;

        document.getElementById('result').innerHTML = '';
        document.getElementById('result').appendChild(downloadLink);
      };
    };
    reader.readAsDataURL(file);
  }
});
