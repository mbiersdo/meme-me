export async function uploadPhoto(content, canvas) {
  const input = content.querySelector('#upload-text');
  input.addEventListener('change', e => handleFileSelect(e, canvas));
}

function handleFileSelect(event, canvas) {
  const files = event.target.files;
  const ctx = canvas.getContext('2d');

  if (files.length > 0) {
    const selectedFile = files[0];
    const image = new Image();
    const reader = new FileReader();

    reader.onload = e => {
      image.src = e.target.result;
      image.onload = () => {
        const scaleFactor = Math.max(canvas.width / image.width, canvas.height / image.height);

        // Calculate the new dimensions
        const newWidth = image.width * scaleFactor;
        const newHeight = image.height * scaleFactor;

        // Calculate the center position
        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        // Clear the canvas and draw the image with the new dimensions and centered position
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, offsetX, offsetY, newWidth, newHeight);
      };
    };

    reader.readAsDataURL(selectedFile);
  }
}
