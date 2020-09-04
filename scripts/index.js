const gridContainer = document.querySelector(".grid-container");
const rainbowColors = ["purple", "blue", "green", "yellow", "orange", "red"];
let colorChoice = "black";
let eraseMode = false;

// Renders a grid of divs based on size.
function makeGrid(gridSize) {

  // Clear out any html in main.
  gridContainer.innerHTML = "";

  let fragment = new DocumentFragment();

  // Create divs.
  for(let i = 0; i < gridSize; i++) {
    for(let j = 0; j < gridSize; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("filled", false);
    
      square.style.width = (500 / gridSize) + "px";
      square.style.height = (500 / gridSize) + "px";
      
      fragment.appendChild(square);
    }
  }

  // Set up hover event listeners.
  fragment.querySelectorAll('.square').forEach(function(square) {
    square.addEventListener("mouseover", function(){
      if (eraseMode == true) {
        square.style.backgroundColor = "white";
        square.setAttribute("filled", false);
      } else {

        if (colorChoice === "rainbow") {
          square.style.backgroundColor = rainbowColors[getRandomInt(0, 5)];
          square.setAttribute("filled", true);
        } else {
          square.style.backgroundColor = colorChoice;
          square.setAttribute("filled", true);
        }
      }
    });
  });
  
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridContainer.append(fragment);
}

function initEventHandlers() {
  // Modal Trigger
  document.querySelector("#new-canvas-button").addEventListener("click", function() {
    let elem = document.querySelector('.modal');
    let options = {
      inDuration: 500,
      outDuration: 200,
      dismissible: false
    };

    let instance = M.Modal.init(elem, options);
    instance.open();

    // Handle "new canvas" button in Modal.
    const createCanvasButton = document.querySelector("#create-canvas-button");
    createCanvasButton.addEventListener("click", function() {
      let gridSize = document.querySelector("#canvas-size").value;
      if(gridSize >= 16 && gridSize <= 64) {
        makeGrid(gridSize);
        instance.close();
      } else {
        makeErrorToast("Must be a valid size", 1500);
      }
    });
  });

  // Creates a Toast.
  function makeErrorToast(html, displayLength) {
    M.toast(
      {html: html,
      classes: 'rounded red',
      displayLength: displayLength});
  }

  // Handle grid Line ON/OFF Switch
  const gridLineSwitch = document.querySelector("#grid-line-switch");
  gridLineSwitch.addEventListener("click", function(){
    if (!gridLineSwitch.checked) {
      document.querySelector(".grid-container").classList.add("no-outline");
    } else {
      document.querySelector(".grid-container").classList.remove("no-outline");
    }
  });

  // Handle color pickers.
  document.querySelectorAll('.pencil-color').forEach(function(picker) {
    picker.addEventListener("change", function(){
      colorChoice = picker.getAttribute("data");
    });
  });

  // Handle hue change slider.
  const hueSlider = document.querySelector("#hue-slider");
  hueSlider.addEventListener("mousemove", function(){
    let value = this.value;

    document.querySelectorAll('.square').forEach(function(square) {
      if (square.getAttribute("filled") === "true" && value != 0) {
        if(value > 510) {
          square.style.backgroundColor = `rgb(255,255,${value % 510}`;
        } else if (value > 255) {
          square.style.backgroundColor = `rgb(255,${value % 255},0`;
        } else {
          square.style.backgroundColor = `rgb(${value},0,0`;
        }
      }
    });
  });

  // Handle opacity change slider.
  const opacitySlider = document.querySelector("#opacity-slider");
  opacitySlider.addEventListener("mousemove", function(){
    let value = this.value;
    
    document.querySelectorAll('.square').forEach(function(square) {
      if (square.getAttribute("filled") === "true") {
        square.style.opacity = value / 100;
      }
    });
  });

  // Handle erase mode switch.
  const eraseModeSwitch = document.querySelector("#erase-mode-switch");
  eraseModeSwitch.addEventListener("click", function(){
    if (eraseModeSwitch.checked) {
      // Erase mode TRUE
      eraseMode = true;
    } else {
      // Erase mode FALSE
      eraseMode = false;
    }
  });

  // Handle Download canvas button.
  document.querySelector('#download-canvas-button').addEventListener('click', function() {
    html2canvas(document.querySelector('.grid-container'), {
        onrendered: function(canvas) {
            // document.body.appendChild(canvas);
          return Canvas2Image.saveAsPNG(canvas);
        }
    });
  });
}

// Generates a random number between min and max inclusive.
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

makeGrid(16);
initEventHandlers();