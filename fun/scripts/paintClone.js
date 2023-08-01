const customCursor = document.getElementById('custom-cursor');
const toolBar = document.getElementById("top-bar");
const activeToolEl = document.getElementById('active-tool');
const brushColor = document.getElementById('brush-color');
const brushIcon = document.getElementById('brush');
const brushSize = document.getElementById('brush-size');
const brushSlider = document.getElementById('brush-slider');
const bucketIcon = document.getElementById('paint-bucket');
const bucketColor = document.getElementById('bucket-color');
const eraserIcon = document.getElementById('eraser');
const clearCanvasBtn = document.getElementById('clear-canvas');
const saveStorageBtn = document.getElementById('save-storage');
const clearStorageBtn = document.getElementById('clear-storage');
const downloadBtn = document.getElementById('download');
const { body } = document;

// Global Variables
const canvas = document.createElement('canvas');
canvas.id = 'canvas';
const context = canvas.getContext('2d');
brushColor.value = '#000000';

const tools = {
    "BRUSH": 0,
    "BUCKET": 1,
    "ERASER": 2
}

let currentSize = 10;
let bgColor = `#${bucketColor.value}`;
let currentColor = `#${brushColor.value}`;
let activeTool = tools.BRUSH;
let isMouseDown = false;
let drawnArray = [];
let earliestImage;

let undoStack = [];
let redoStack = [];

/*************************************/
/******** Initialize Canvas **********/
/*************************************/
createCanvas();
earliestImage = canvas

/*************************************/
/******* Toolbar functionality *******/
/*************************************/

// Selecting Brush Tool
brushIcon.addEventListener('click', switchToBrush);

// Setting Brush Color
brushColor.addEventListener('change', () => {
    switchToBrush();
    currentColor = `#${brushColor.value}`;
});

// Setting Brush Size
brushSlider.addEventListener('change', changeBrushSize);

// Selecting Bucket Tool
bucketIcon.addEventListener('click', () => {
    switchActiveToolTo(tools.BUCKET);
});

// Setting Background Color
bucketColor.addEventListener('change', () => {
    bgColor=`#${bucketColor.value}`;
});

// Eraser
eraserIcon.addEventListener('click', () => {
    switchActiveToolTo(tools.ERASER);
    activeToolEl.textContent = 'Eraser';
    currentColor = bucketColor;
    currentSize = 50;
});

// Download Image
downloadBtn.addEventListener('click', () => {
    downloadBtn.href = canvas.toDataURL('image/jpeg');
    activeToolEl.textContent = 'Image File Saved';
    setTimeout(switchToBrush, 1500);
});


/*************************************/
/********* Helper Functions **********/
/*************************************/
function changeBrushSize() {
    currentSize = brushSlider.value;
    if (currentSize < 10) {
      brushSize.textContent = `0${currentSize}`;
    } else {
      brushSize.textContent = currentSize;
    }
}

// Fill algorithm taken from answer to https://stackoverflow.com/questions/53077955/
function getPixel(imageData, x, y) {
    if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
        return [-1, -1, -1, -1];  // impossible color
    } else {
        const offset = (y * imageData.width + x) * 4;
        return imageData.data.slice(offset, offset + 4);
    }
}
  
function setPixel(imageData, x, y, color) {
    const offset = (y * imageData.width + x) * 4;
    imageData.data[offset + 0] = color.r;
    imageData.data[offset + 1] = color.g;
    imageData.data[offset + 2] = color.b;
}

function colorsMatch(a, b) {
    return a[0] == b[0] && a[1] == b[1] && a[2] == b[2] && a[3] == b[3];
}
  
function floodFill(x, y, fillColor) {
    // read the pixels in the canvas
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    
    // get the color we're filling
    const targetColor = getPixel(imageData, x, y);

    // get the rgb value of the fill color 
    const fillRGBArr = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fillColor);
    const fillColorRGB = {
        'r': parseInt(fillRGBArr[1], 16),
        'g': parseInt(fillRGBArr[2], 16),
        'b': parseInt(fillRGBArr[3], 16)
    };

    // check we are actually filling a different color
    if (!colorsMatch(targetColor, fillColorRGB)) {
        fillPixel(imageData, x, y, targetColor, fillColorRGB);
    }
}
  
function fillPixel(imageData, x, y, targetColor, fillColor) {
  // check we are actually filling a different color
    if (!colorsMatch(targetColor, fillColor)) {
        const pixelsToCheck = [x, y];
        while (pixelsToCheck.length > 0) {
            const y = pixelsToCheck.pop();
            const x = pixelsToCheck.pop();
            
            const currentColor = getPixel(imageData, x, y);
            if (colorsMatch(currentColor, targetColor)) {
                setPixel(imageData, x, y, fillColor);
                pixelsToCheck.push(x + 1, y);
                pixelsToCheck.push(x - 1, y);
                pixelsToCheck.push(x, y + 1);
                pixelsToCheck.push(x, y - 1);
            }
        }
    }
    
    // put the data back
    context.putImageData(imageData, 0, 0);
  }

// Switch back to Brush
function switchToBrush() {
    switchActiveToolTo(tools.BRUSH);

    activeToolEl.textContent = 'Brush';
    currentColor = `#${brushColor.value}`;
    currentSize = 10;
    brushSlider.value = 10;
    changeBrushSize();
}

function getCurrentTool() {
    switch(activeTool) {
        case tools.BRUSH:
            return brushIcon;
        case tools.BUCKET:
            return bucketIcon;
        case tools.ERASER:
            return eraserIcon;
    }
}

function switchActiveToolTo(newTool) {
    getCurrentTool().classList.remove('active-icon');
    activeTool = newTool;
    getCurrentTool().classList.add('active-icon');
}

// Create Canvas
function createCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - toolBar.clientHeight;
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    body.appendChild(canvas);
}

// Change canvas size with window 
window.addEventListener('resize', () => {
    if (window.innerWidth > canvas.width || window.innerHeight > canvas.height) {

        if (window.innerWidth > canvas.width) {
            canvas.width = window.innerWidth;
        }
        
        if (window.innerHeight > canvas.height) {
            canvas.height = window.innerHeight;
        }
           
        createCanvas();
        restoreCanvas();
    }
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
            context.strokeStyle = bgColor;
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
      eraser,
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

    if (activeTool == tools.BUCKET) {
        floodFill(currentPosition.x, currentPosition.y, bgColor);
    } else {
        context.beginPath();
        context.lineWidth = currentSize;
        context.lineCap = 'round';
        context.strokeStyle = activeTool == tools.ERASER ? 'white' : currentColor;
    }
    
});

// Mouse Move
canvas.addEventListener('mousemove', (event) => {
    if (isMouseDown && activeTool != tools.BUCKET) {
        const currentPosition = getMousePosition(event);
        context.lineTo(currentPosition.x, currentPosition.y);
        context.stroke();
        storeDrawn(
            currentPosition.x,
            currentPosition.y,
            currentSize,
            currentColor,
            activeTool == tools.ERASER
        );
    } else if (activeTool != tools.BUCKET) {
      storeDrawn(undefined);
    }
});

// Mouse Up
canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
});


