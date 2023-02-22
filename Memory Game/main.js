const tilesContainer = document.querySelector(".tiles");
const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"]; //chooses color of tiles
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length; //references number of tiles

let revealedCount = 0;
let activeTile = null; ///lets you choose tile than move onto next one
let awaitingEndOfMove = false;

const buildTile = color => {
  const element = document.createElement("div");
  element.classList.add("tile"); //adds tile class element
  element.dataset.color = color;
  element.dataset.revealed = false; 
  /*
    This function below is used to create a tile element with a specific color and initial reveal
    state when building up the game board in the for loop at the end of the code.
  */

  element.addEventListener("click", () => {
    const revealed = element.dataset.revealed;
    
    if (awaitingEndOfMove || revealed === "true" || element === activeTile) {
      return; //this function will change the background color of tile if conditions are met
    }

    element.style.backgroundColor = color;

    if (!activeTile) {
      activeTile = element; //this block checks if there is no active tile selected before current tile is clicked
      return;
    }

    const colorToMatch = activeTile.dataset.color;

    if (colorToMatch === color) {
      element.dataset.revealed = true;
      activeTile.dataset.revealed = true;
      activeTile = null; //this block checks if the tiles match
      awaitingEndOfMove = false;
      revealedCount += 2;

      if (revealedCount === tileCount) { //formats and displays the 'You win!' 
        const winTitle = document.createElement("h1");
        winTitle.textContent = "You win!";
        winTitle.style.textAlign = "center";
        winTitle.style.marginTop = "48px";
        winTitle.style.color = "white"; 
        document.body.appendChild(winTitle);
        setTimeout(() => {
          if (confirm("Do you want to play again?")) { //refreshes page if player wants to continue
            window.location.reload();
          }
        }, 1000);
        return;
      }
      return;
    }

    awaitingEndOfMove = true;
// //will prevent user from selecting multiple tiles while game is checking current ones
    setTimeout(() => {
      activeTile.style.backgroundColor = null;
      element.style.backgroundColor = null;
      awaitingEndOfMove = false;
      activeTile = null;
    }, 1000);
  });

  return element;
};

colorsPicklist //randomizes colors of tiles
  .sort(() => Math.random() - 0.5)
  .map(color => buildTile(color))
  .forEach(tile => tilesContainer.appendChild(tile));