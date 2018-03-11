let colorPicker;
let pixelCanvas;
let canvas;
let ctx;
let height;
let width;
let outputHeight;
let outputWidth;

/** 
 * @description init the grid with 16x16 cells
*/
function initGrid() {
    createGrid(16, 16);
}

/** 
 * @description paint clicked pixel
*/
function paintPixel(e) {
    let d = e.target || e.srcElement;
    d.bgColor = colorPicker.value;
}

/** 
 * @description erase all pixels
*/
function clearPixels() {
    let pixels = pixelCanvas.getElementsByClassName("pixel");
    for(let i = 0; i < pixels.length; i++)
    {
        pixels[i].bgColor = "transparent";
    }
}

/** 
 * @description delete all <tr> and <td>
*/
function deleteGrid()
{
    let pixelRows = pixelCanvas.getElementsByClassName("pixelRow");
    while(pixelRows[0]) {
        pixelRows[0].parentNode.removeChild(pixelRows[0]);
    }
}

/** 
 * @description create grid cells
*/
function createGrid(h, w) {
    deleteGrid();
    for(let i = 0; i < h; i++) {
        let row = document.createElement("tr");
        row.classList.add("pixelRow");
        for(let j = 0; j < w; j++) {
            let rowData = document.createElement("td");
            rowData.classList.add("pixel");
            rowData.addEventListener("click", paintPixel);
            row.appendChild(rowData);
        }
        clearPixels();
        pixelCanvas.appendChild(row);
    }
}

/** 
 * @description create png file
*/
function save()
{
    const x = outputWidth.value / width.value;
    const y = outputHeight.value / height.value;
    canvas.width = outputWidth.value;
    canvas.height = outputWidth.value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);    
    const pixelRows = document.getElementsByClassName("pixelRow");
    for(let i = 0; i < height.value; i++) {
        let pixels = pixelRows[i].getElementsByClassName("pixel");
        for(let j = 0; j < width.value; j++)
        {           
            ctx.fillStyle = pixels[j].bgColor;             
            ctx.fillRect(j * x, i * y, x, y);
        }        
    }     
    const img = canvas.toDataURL("image/jpg");    
    const download = document.createElement('a');
    document.body.appendChild(download);
    download.href = img;
    download.download = "pixelart.png";
    download.click();
    document.body.removeChild(download);
}

/** 
 * @description init the app
*/
function init()
{
    colorPicker = document.getElementById("colorPicker");
    pixelCanvas = document.getElementById("pixelCanvas");
    height = document.getElementById("inputHeight");
    width = document.getElementById("inputWidth");
    outputHeight = document.getElementById("outputHeight");
    outputWidth = document.getElementById("outputWidth");
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    document.getElementById("clear-btn").addEventListener("click", clearPixels);
    document.getElementById("create-btn").addEventListener("click", function(){createGrid(height.value, width.value);});
    document.getElementById("save-btn").addEventListener("click", save);
    initGrid();
}

window.onload = init;