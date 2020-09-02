const gridContainer = document.querySelector(".grid-container");

// Renders a grid of divs based on size.
function makeGrid(gridSize) {
  // Clear out any html in main.
  gridContainer.innerHTML = "";

  // Create divs.
  for(let i = 0; i < gridSize; i++) {

    for(let j = 0; j < gridSize; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
    
      square.style.width = (500 / gridSize - 2) + "px";
      square.style.height = (500 / gridSize - 2) + "px";
      
      gridContainer.appendChild(square);
    }
  }

  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
}

makeGrid(16);