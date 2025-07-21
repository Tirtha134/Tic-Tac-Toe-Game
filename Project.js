// Select all boxes in the grid (buttons with class 'box')
let boxes = document.querySelectorAll(".box");

// Select the reset button (bottom of the game)
let resetBtn = document.querySelector("#reset-btn");

// Select the new game button (shown in the winner/draw message)
let newGame = document.querySelector("#new-btn");

// Select the container that shows the winner/draw message
let msgContainer = document.querySelector(".msg-container");

// Select the paragraph where the winner/draw text is displayed
let msg = document.querySelector("#msg");

// Boolean to track the current turn: true = Player O's turn, false = Player X's turn
let turn0 = true;

// Counter to track the number of moves made
let moveCount = 0;

// Array of all winning combinations (indexes of buttons)
const winPatterns = [
  [0, 1, 2], // Top row
  [0, 3, 6], // Left column
  [0, 4, 8], // Diagonal (top-left to bottom-right)
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [2, 4, 6], // Diagonal (top-right to bottom-left)
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
];

// Function to reset the game to the initial state
const resetGame = () => {
  turn0 = true; // Set to Player O's turn
  moveCount = 0; // Reset move count
  enableBoxes(); // Clear and enable all boxes
  msgContainer.classList.add("hide"); // Hide the winner/draw message
};

// Add click event listener to each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Place "O" or "X" based on the current turn
    if (turn0) {
      box.innerText = "O"; // Player O's move
      box.style.color = "#2980b9"; // Blue color for O
    } else {
      box.innerText = "X"; // Player X's move
      box.style.color = "#e74c3c"; // Red color for X
    }

    box.disabled = true; // Disable the box after it's clicked
    turn0 = !turn0; // Toggle the turn to the other player
    moveCount++; // Increase the move count

    checkWinner(); // Check if someone has won or if it's a draw
  });
});

// Function to disable all boxes (used after game ends)
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Function to enable all boxes and reset their styles and values
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false; // Make box clickable again
    box.innerText = ""; // Clear text
    box.style.color = "#b0413e"; // Default color
    box.style.backgroundColor = "#ffffc7"; // Reset background color
    box.style.transform = "scale(1)"; // Reset scale/size
  }
};

// Function to show the winner message
const showWinner = (winner) => {
  msg.innerText = `🎉 Congratulations! Winner is ${winner}`; // Set winner text
  msgContainer.classList.remove("hide"); // Show message container
  disableBoxes(); // Prevent further moves
};

// Function to show the draw message
const showDraw = () => {
  msg.innerText = "🤝 It's a Draw Game!"; // Set draw message
  msgContainer.classList.remove("hide"); // Show message container
};

// Function to check for a winner or draw
const checkWinner = () => {
  for (let pattern of winPatterns) {
    // Get values of the three boxes in the current pattern
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    // If none of the boxes are empty and all three are equal
    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        highlightWinningBoxes(pattern); // Highlight winning boxes
        showWinner(pos1val); // Show the winner message
        return; // Exit after a win
      }
    }
  }

  // If all 9 moves have been made and no winner => it's a draw
  if (moveCount === 9) {
    showDraw();
  }
};

// Function to visually highlight winning boxes
const highlightWinningBoxes = (pattern) => {
  for (let index of pattern) {
    boxes[index].style.backgroundColor = "#55efc4"; // Light green highlight
    boxes[index].style.transform = "scale(1.1)"; // Slight zoom effect
  }
};

// Add event listeners to both the New Game and Reset Game buttons
newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
