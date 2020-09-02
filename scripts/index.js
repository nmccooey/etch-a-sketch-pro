const gridContainer = document.querySelector(".grid-container");

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
    
      square.style.width = (500 / gridSize) + "px";
      square.style.height = (500 / gridSize) + "px";
      
      fragment.appendChild(square);
    }
  }

  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridContainer.append(fragment);
}

function initEventHandlers() {
  // Modal Trigger
  document.querySelector("#new-canvas-button").addEventListener("click", function() {
    let elem = document.querySelector('.modal');
    let options = {
      inDuration: 500,
      outDuration: 500,
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
        M.toast(
          {html: 'Must be a valid size.',
          classes: 'rounded red',
          displayLength: 1500});
      }
    });
  });

  // Handle grid Line ON/OFF Switch
  const gridLineSwitch = document.querySelector("#grid-line-switch");
  gridLineSwitch.addEventListener("click", function(){
    if (!gridLineSwitch.checked) {
      document.querySelector(".grid-container").classList.add("no-outline");
    } else {
      document.querySelector(".grid-container").classList.remove("no-outline");
    }
  });
}

makeGrid(16);
initEventHandlers();