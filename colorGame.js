let mode = 6;
let squaresList = document.querySelectorAll(".square");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#resetButton");
let modeButtons = document.querySelectorAll(".mode");
let colorDisplay = document.querySelector("#colorDisplay");

///////////////////////////
//// initalize game //////
/////////////////////////
init();

///////////////////////////
/////// FUNCTIONS ////////
/////////////////////////

// function to start game
function init() {
  setUpModes();
  setUpSquares();
  reset();
}

// function to set up mode button listeners
function setUpModes() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      // hardcode to erase selected class
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      // check if button is easy or hard
      this.textContent === "Easy" ? mode = 3 : mode = 6;
      reset();
    });
  }
}

// function to set up event listener for activate clicking of squares
function setUpSquares() {
  for (var i = 0; i < squaresList.length; i++) {
    // add click listener for each square
    squaresList[i].addEventListener("click", function() {
      // if square chosen is correct
      if (this.style.backgroundColor === winningSquare) {
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "PLAY AGAIN?"
        h1.style.backgroundColor = winningSquare;
        changeSquaresToWinningColor();
      }
      // if square chosen is incorrect
      else {
        messageDisplay.textContent = "Try Again";
        this.style.backgroundColor = "#232323"
      }
    });
  }
}

// function to reset
function reset() {
  // reset button event listener
  resetButton.addEventListener("click", reset);

  h1.style.backgroundColor = "steelblue";
  resetButton.textContent = "NEW COLORS";
  messageDisplay.textContent = "";
  colors = generateColors(mode);
  winningSquare = pickWinningSquare();
  colorDisplay.textContent = winningSquare
  // loop through squaresList add color
  for (var i = 0; i < squaresList.length; i++) {
    if (colors[i]) {
      // always show blocks
      squaresList[i].style.display = "block";
      squaresList[i].style.backgroundColor = colors[i];
    }
    // hide bottom 3 squares
    else {
      squaresList[i].style.display = "none";
    }
  }
}

// function to change all squares to winning color
function changeSquaresToWinningColor() {
  for (var i = 0; i < squaresList.length; i++) {
    squaresList[i].style.backgroundColor = winningSquare;
  }
}

// function to choose the right square
// randomly selects one
function pickWinningSquare() {
  let num = Math.floor(Math.random() * colors.length)
  let winningSquare = colors[num]
  return winningSquare
}

// function to set up colors
// takes num as parameter
function generateColors(num) {
  colors = [];
  for (var i = 0; i < num; i++) {
    color = makeRGB();
    colors.push(color);
  }
  return colors
}

// function to create a rgbcolor format
function makeRGB() {
  let r = Math.round(Math.random() * 255)
  let g = Math.round(Math.random() * 255)
  let b = Math.round(Math.random() * 255)
  return "rgb(" + r + ", " + g + ", " + b + ")"
}
