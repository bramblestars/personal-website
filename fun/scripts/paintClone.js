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
const undoIcon = document.getElementById('undo');
const redoIcon = document.getElementById('redo');
const downloadBtn = document.getElementById('download');
const clearCanvasBtn = document.getElementById('clear-canvas');
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
let undoStack = [];
let redoStack = [];

let points = []; // accumulator for a line made up of many points

/*************************************/
/******** Initialize Canvas **********/
/*************************************/
createCanvas();

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
    switchActiveToolTo(tools.BUCKET);
});

// Eraser
eraserIcon.addEventListener('click', switchToEraser);

// Undo
undoIcon.addEventListener('click', undo);

// Redo
redoIcon.addEventListener('click', redo);

// Download Image
downloadBtn.addEventListener('click', download);

// Clear Canvas
clearCanvasBtn.addEventListener('click', clearCanvas);

/*************************************/
/******** Keyboard Handlers **********/
/*************************************/
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey) {
        switch(event.key) {
            case 'z':
                undo();
                break;
            case 'y':
                redo();
                break;
            case 's':
                download();
                break;
        }
    } else {
        switch(event.key) {
            case 'p': 
                switchToBrush();
                break;
            case 'e':
                switchToEraser();
                break;
            case 'b':
                switchActiveToolTo(tools.BUCKET);
                break;
            case 'c':
                clearCanvas();
                break;
        }
    }

  });

/*************************************/
/******* Tool Helper Functions********/
/*************************************/

/**
 * Changes brush size based on slider and displays the correct
 * number, with a 0 appended to the beginning if the size is <10
 */
function changeBrushSize() {
    currentSize = brushSlider.value;
    if (currentSize < 10) {
      brushSize.textContent = `0${currentSize}`;
    } else {
      brushSize.textContent = currentSize;
    }
}

// Fill algorithm taken from answer to https://stackoverflow.com/questions/53077955/

/**
 * gets the color at a given pixel at coordinate (x, y) on the canvas
 * @param {ImageData} imageData Image data
 * @param {int} x The x coordinate of the pixel to retrieve
 * @param {int} y The y coordinate of the pixel to retrieve
 * @returns the color of the specified pixel
 */
function getPixel(imageData, x, y) {
    if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
        return [-1, -1, -1, -1];  // impossible color
    } else {
        const offset = (y * imageData.width + x) * 4;
        return imageData.data.slice(offset, offset + 4);
    }
}
  
/**
 * sets the pixel at coordinate (x, y) to the given color
 * @param {ImageData} imageData Image data
 * @param {int} x The x coordinate of the pixel to set
 * @param {int} y The y coordinate of the pixel to set
 * @param {any} color The color to set the given pixel to
 */
function setPixel(imageData, x, y, color) {
    const offset = (y * imageData.width + x) * 4;
    imageData.data[offset + 0] = color.r;
    imageData.data[offset + 1] = color.g;
    imageData.data[offset + 2] = color.b;
}

/**
 * Compares if two colors are equal
 * @param {color} a 
 * @param {color} b 
 * @returns true if a and b match, false otherwise
 */
function colorsMatch(a, b) {
    return a[0] == b[0] && a[1] == b[1] && a[2] == b[2] && a[3] == b[3];
}

/**
 * Given a coordinate (x, y) and a color, fills the region containing pixel(x, y) with the given color
 * @param {int} x The x coordinate the user clicked on
 * @param {int} y The y coordinate the user clicked on
 * @param {any} fillColor The color to fill the specified region with
 */
function floodFill(x, y, fillColor) {
     
    // read the pixels in the canvas
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    
    // check if we're inside the canvas 
    if (x < 0 || x >= context.canvas.width || y < 0 || y >= context.canvas.height) {
        return;
    }


    // get the color we're filling
    const targetColor = getPixel(imageData, x, y);

    // get the rgb value of the fill color 
    const fillRGBArr = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fillColor);
    const fillColorRGB = {
        'r': parseInt(fillRGBArr[1], 16),
        'g': parseInt(fillRGBArr[2], 16),
        'b': parseInt(fillRGBArr[3], 16)
    };

    const fillColorClampedArr = [fillColorRGB.r, fillColorRGB.g, fillColorRGB.g, 255];

    // check we are actually filling a different color
    if (!colorsMatch(targetColor, fillColorClampedArr)) {
        fillPixel(imageData, x, y, targetColor, fillColorRGB);
    }
}

/**
 * DFS algorithm to fill region with a given color
 * @param {ImageData} imageData Image Data
 * @param {int} x The x coordinate of the pixel we are currently checking
 * @param {int} y The y coordinate of the pixel we are currently checking
 * @param {any} targetColor The original color of the region
 * @param {any} fillColor The new color of the region
 */
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

/**
 * Switch to the brush tool, setting the color and size
 */
function switchToBrush() {
    switchActiveToolTo(tools.BRUSH);
    activeToolEl.textContent = 'Brush';
    currentColor = `#${brushColor.value}`;
    currentSize = 10;
    brushSlider.value = 10;
    changeBrushSize();
}

function switchToEraser() {
    switchActiveToolTo(tools.ERASER);
    activeToolEl.textContent = 'Eraser';
    currentColor = bucketColor;
    currentSize = 40;
}

/**
 * @returns the HTML element associated with the current activeTool 
 */
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

/**
 * Removes the active-icon class from the current active tool,
 * sets the activeTool global variable to the new tool, and then
 * adds the active-icon class to the new tool
 * @param {int} newTool the tool we are trying to switch to
 */
function switchActiveToolTo(newTool) {
    // remove drop shadow effect from previous tool
    getCurrentTool().classList.remove('active-icon');
    
    activeTool = newTool;

    // add drop shadow effect to new tool
    getCurrentTool().classList.add('active-icon');
}

/**
 * Undo the previous draw action and puts it onto the "redo" stack
 */
function undo() {
    if (undoStack.length > 0) {
        let undoneLine = undoStack.pop();
        redoStack.push(undoneLine);
        createCanvas();
        restoreCanvas();
    }
}

/**
 * Redo the previously undone draw action, if it exists
 */
function redo() {
    if (redoStack.length > 0) {
        let redoLine = redoStack.pop();
        undoStack.push(redoLine);
        draw(redoLine);
    }
}

/**
 * Downloads the current image on the canvas to a jpeg file
 */
function download() {
    downloadBtn.href = canvas.toDataURL('image/jpeg');
    activeToolEl.textContent = 'Image File Saved';
    setTimeout(switchToBrush, 1500);
}

/**
 * Clear the current canvas as well as the draw array. Switch back to the brush
 * tool after 1.5s
 */
function clearCanvas() {
    createCanvas();
    undoStack = [];
    redoStack = [];
    // Active Tool
    activeToolEl.textContent = 'Canvas Cleared';
    setTimeout(switchToBrush, 1500);
}

/*************************************/
/****** Canvas Helper Functions ******/
/*************************************/

/**
 * Creates a canvas which fills the window and colors it white
 */
function createCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - toolBar.clientHeight;
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    body.appendChild(canvas);
}

/** 
 * Change canvas size with window. Ignores change if the window is getting smaller.
 * */ 
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


/**
 * Draw what is stored in undoStack
 */
function restoreCanvas() {
    for (let i = 0; i < undoStack.length; i++) {
        draw(undoStack[i]);
    }
}

/**
 * Given an array line, draws the action specified by the points in the line.
 * @param {Array} line 
 */
function draw(line) {
    if (line[0].tool == tools.BUCKET) {
        floodFill(line[0].x, line[0].y, line[0].color);
        return; // since bucket action will only have one point
    }

    for (let i = 1; i < line.length; i++) {
        context.beginPath();
        context.moveTo(line[i - 1].x, line[i - 1].y);
        context.lineWidth = line[i].size;
        context.lineCap = 'round';
        if (line[i].tool == tools.ERASER) {
            context.strokeStyle = 'white';
        } else { //
            context.strokeStyle = line[i].color;
        }
        context.lineTo(line[i].x, line[i].y);
        context.stroke();
    }
}

/**
 * Stores a point in the current "points" accumulator
 * @param {int} x The x coordinate of the point
 * @param {int} y The y coordinate of the point
 * @param {int} size The brush size (if applicable)
 * @param {any} color The color of the current drawing action
 * @param {int} tool The tool being used for the current drawing action
 */
function storeDrawn(x, y, size, color, tool) {
    const point = {
      x,
      y,
      size,
      color,
      tool
    };
    points.push(point);
}

/*************************************/
/********** Mouse Handlers ***********/
/*************************************/

/**
 * Returns an (x, y) coordinate of the current mouse 
 * position in relation to the canvas.
 * @param {Event} event 
 * @returns an object Pos where Pos.x is the x coordinate of the mouse action
 *          and Pos.y is the y coordinate
 */
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
    redoStack = [];

    if (activeTool == tools.BUCKET) {
        floodFill(currentPosition.x, currentPosition.y, bgColor);
        storeDrawn(
            currentPosition.x,
            currentPosition.y,
            0,
            bgColor,
            tools.BUCKET
        );
    } else {
        context.beginPath();
        context.lineWidth = currentSize;
        context.lineCap = 'round';
        context.strokeStyle = (activeTool == tools.ERASER) ? '#FFFFFF' : currentColor;
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
            activeTool
        );
    } 
});

// Mouse Up
canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
    if (points.length > 0) undoStack.push(points);
    points = [];
});


