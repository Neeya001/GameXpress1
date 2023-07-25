//We need to add game over tool
var board;
var score = 0;
var rows = 4;
var columns = 4;
window.onload = function() { //loads function whenever the webpage in load
    setGame();
}
function setGame(){
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    for(let r = 0; r<rows; r++){
        for(let c = 0; c<columns; c++){
            //put div in the tile
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}
function hasEmptyTile(){
    for(let r =0; r<rows; r++){
        for(let c = 0; c<columns; c++){
            if(board[r][c] == 0){
                return true;
            }
        }
    }
    return false;
    
}
// Function to check if the game is over
function gameOver(board) {
    // Check if there are any empty cells
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        if (board[row][col] === 0) {
          return false; // Game is not over
        }
      }
    }
  
    // Check for any adjacent cells with the same value
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        // Check horizontally adjacent cells
        if (col !== 3 && board[row][col] === board[row][col + 1]) {
          return false; // Game is not over
        }
  
        // Check vertically adjacent cells
        if (row !== 3 && board[row][col] === board[row + 1][col]) {
          return false; // Game is not over
        }
      }
    }
  
    return true; // Game is over
  }
  
  
  
function setTwo(){
    if(!hasEmptyTile()){
        if (gameOver(board)) {
            window.location.href = 'gameover.html';
          } else {
            console.log("Game is not over yet.");
          }
        return;
    }
    let found = false;
    while(!found) {
        //random r,c value
        let r = Math.floor(Math.random() * rows); //0-1 *4 -> round and get rid of decimal
        let c = Math.floor(Math.random() * columns);
        if(board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}
function updateTile(tile, num){
    tile.innerText = ""; //clears number in the tile
    tile.classList.value = "";//clears the classList 
    tile.classList.add("tile"); //adds the class on it as tile which was removed above
    if(num > 0){
        tile.innerText = num.toString();
        if(num <= 4096){
            tile.classList.add("x"+num.toString()); //adds the class list which is gonna change color
        }
        else{
            tile.classList.add("x8192");
        }
    }
    if(num == 2048){
        var element = document.getElementById("heading");

// Modify the text content
    element.textContent = "😎😎😎YOU WONNN😎😎😎";
    }
}
document.addEventListener("keyup", (e) => {
    
    if(e.code == "ArrowLeft"){

        slideLeft();
        setTwo();
    }
    else if(e.code == "ArrowRight"){
        slideRight();
         setTwo();
    }
    else if(e.code == "ArrowUp"){
        slideUp();
         setTwo();
    }
    else if(e.code == "ArrowDown"){
        slideDown();
         setTwo();
    }
    
   
    document.getElementById("score").innerText = score;
})
function filterZero(row){
    return row.filter(num => num != 0); //create  a new array with is copy of orginal without zeros
}
function slide(row){
    //[0, 2, 2, 2]
    row = filterZero(row); //get rid of zeros-> [2,2, 2]
    //slide
    for(let i = 0; i< row.length-1; i++){
        //checks every 2
        if(row[i] == row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
            //[2, 2,2] => [4, 0, 2]
        }
    }
    row = filterZero(row);//[4,2]
    //add zeros
    while(row.length < columns){
        row.push(0);
        //[4, 2, 0, 0]
    }
    return row;
}
function slideLeft(){
    for(let r = 0; r< rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for(let c=0;  c < columns; c++){
            let tile = document.getElementById(r.toString() + "-"+c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
function slideRight(){
    for(let r = 0; r< rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        board[r] = row.reverse();
        
        for(let c=0;  c < columns; c++){
            let tile = document.getElementById(r.toString() + "-"+c.toString());
            let num = board[r][c];
            updateTile(tile, num);
            
        }
    }
}
function slideUp(){
    for(let c =0; c<columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];
        for(let r=0;  r < columns; r++){
            //board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-"+c.toString());
            let num = board[r][c];
            updateTile(tile, num);
            
        } 
    }
}
function slideDown(){
    for(let c =0; c<columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];
        for(let r=0;  r < columns; r++){
            let tile = document.getElementById(r.toString() + "-"+c.toString());
            let num = board[r][c];
            updateTile(tile, num);
            
        } 
    }
}
