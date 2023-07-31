const toolBar = document.getElementById("top-bar");
const activeToolEl = document.getElementById('active-tool');
const brushColor = document.getElementById('brush-color');
const brushIcon = document.getElementById('brush');
const brushSize = document.getElementById('brush-size');
const brushSlider = document.getElementById('brush-slider');
const bucketColor = document.getElementById('bucket-color');
const eraser = document.getElementById('eraser');
const clearCanvasBtn = document.getElementById('clear-canvas');
const saveStorageBtn = document.getElementById('save-storage');
const loadStorageBtn = document.getElementById('load-storage');
const clearStorageBtn = document.getElementById('clear-storage');
const downloadBtn = document.getElementById('download');
const { body } = document;

// Global Variables
const canvas = document.createElement('canvas');
canvas.id = 'canvas';
const context = canvas.getContext('2d');

let currentSize = 10;
let bgColor = `#${bucketColor.value}`;
let currentColor = `#${brushColor.value}`;
let isEraser = false;
let isMouseDown = false;
let drawnArray = [];

// Formatting Brush Size
function changeBrushSize() {
  currentSize = brushSlider.value;
    if (currentSize < 10) {
      brushSize.textContent = `0${currentSize}`;
    } else {
      brushSize.textContent = currentSize;
    }
}

// Setting Brush Size
brushSlider.addEventListener('change', changeBrushSize);

// Setting Brush Color
brushColor.addEventListener('change', () => {
    isEraser = false;
    currentColor = `#${brushColor.value}`;
});

// Setting Background Color
bucketColor.addEventListener('change', () => {
    bgColor=`#${bucketColor.value}`;
    createCanvas();
    restoreCanvas();
});

// Eraser
eraser.addEventListener('click', () => {
    isEraser = true;
    brushIcon.style.color = 'white';
    eraser.style.color = 'black';
    activeToolEl.textContent = 'Eraser';
    currentColor = bucketColor;
    currentSize = 50;
});

// Switch back to Brush
function switchToBrush() {
    isEraser = false;
    activeToolEl.textContent = 'Brush';
    brushIcon.style.color = 'black';
    eraser.style.color = 'white';
    currentColor = `#${brushColor.value}`;
    currentSize = 10;
    brushSlider.value = 10;
    changeBrushSize();
}

// Create Canvas
function createCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - toolBar.clientHeight;
    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    body.appendChild(canvas);
}

// Change canvas size with window 
window.addEventListener('resize', () => {
    console.log("??");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - toolBar.clientHeight;
    createCanvas();
    restoreCanvas();
})

// Clear Canvas
clearCanvasBtn.addEventListener('click', () => {
    createCanvas();
    drawnArray = [];
    // Active Tool
    activeToolEl.textContent = 'Canvas Cleared';
    setTimeout(switchToBrush, 1500);
});

// Draw what is stored in DrawnArray
function restoreCanvas() {
    for (let i = 1; i < drawnArray.length; i++) {
      context.beginPath();
      context.moveTo(drawnArray[i - 1].x, drawnArray[i - 1].y);
      context.lineWidth = drawnArray[i].size;
      context.lineCap = 'round';
      if (drawnArray[i].eraser) {
        context.strokeStyle = bucketColor;
      } else {
        context.strokeStyle = drawnArray[i].color;
      }
      context.lineTo(drawnArray[i].x, drawnArray[i].y);
      context.stroke();
    }
}

// Store Drawn Lines in DrawnArray
function storeDrawn(x, y, size, color, erase) {
    const line = {
      x,
      y,
      size,
      color,
      erase,
    };
    drawnArray.push(line);
}

// Get Mouse Position
function getMousePosition(event) {
    const boundaries = canvas.getBoundingClientRect();
    return {
        x: event.clientX - boundaries.left,
        y: event.clientY - boundaries.top,
    };
}

// Mouse Down
canvas.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    const currentPosition = getMousePosition(event);
    context.moveTo(currentPosition.x, currentPosition.y);
    context.beginPath();
    context.lineWidth = currentSize;
    context.lineCap = 'round';
    context.strokeStyle = isEraser ? bgColor : currentColor;
});

// Mouse Move
canvas.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        const currentPosition = getMousePosition(event);
        context.lineTo(currentPosition.x, currentPosition.y);
        context.stroke();
        storeDrawn(
          currentPosition.x,
          currentPosition.y,
          currentSize,
          currentColor,
          isEraser,
        );
    } else {
      storeDrawn(undefined);
    }
});

// Mouse Up
canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// // Save to Local Storage
// saveStorageBtn.addEventListener('click', () => {

//   // Active Tool
//   activeToolEl.textContent = 'Canvas Saved';
//   setTimeout(switchToBrush, 1500);
// });

// // Load from Local Storage
// loadStorageBtn.addEventListener('click', () => {
//   if (localStorage.) {
//     drawnArray = JSON(localStorage.);

//   // Active Tool
//     activeToolEl.textContent = 'Canvas Loaded';
//     setTimeout(switchToBrush, 1500);
//   } 

// });

// // Clear Local Storage
// clearStorageBtn.addEventListener('click', () => {

//   // Active Tool
//   activeToolEl.textContent = 'Local Storage Cleared';
//   setTimeout(switchToBrush, 1500);
// });

// // Download Image
// downloadBtn.addEventListener('click', () => {

//   // Active Tool
//   activeToolEl.textContent = 'Image File Saved';
//   setTimeout(switchToBrush, 1500);
// });

// Event Listener
brushIcon.addEventListener('click', switchToBrush);

// On Load
createCanvas();
