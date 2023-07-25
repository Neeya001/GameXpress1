var errors = 4;
var cardList = [
    "mediumpurple",
     "lime", 
     "aqua",
      "darkgoldenrod",
       "pink",
        "darkcyan",
          "burlywood",
            "red"
        ];
var cardSet;
var board = [];
var revealCount = 0;
var rows = 4;
var columns = 4;
var scard1;
var scard2;
window.onload = function(){
    shuffleCards();
    startGame();
}
function shuffleCards(){

    cardSet = cardList.concat(cardList); //two of each card
    console.log(cardSet);
    //shuffle
    for(let i =0; i<cardSet.length; i++){
        let j = Math.floor(Math.random() * cardSet.length);//get random index
        //swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;

    }
    console.log(cardSet);
}
function startGame(){ 
    //arrange the board
    document.getElementById("errors").innerText = errors;
    for(let r =0; r<rows; r++){
        let row = [ ];
        for(let c =0; c<columns; c++){
            let cardColor = cardSet.pop();
            row.push(cardColor);
            //<div id="0-0" class="card" style:"background-color:red;">
            const card = document.createElement("div");
            card.id = r.toString()+"-"+c.toString();
            card.style.backgroundColor = cardColor;
            card.classList.add("card");
            card.addEventListener("click",selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    console.log(board);
    setTimeout(hideCards, 1000);
}
function hideCards(){
    for(let r = 0; r<rows; r++){
        for(let c = 0; c<columns; c++){
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.style.backgroundColor = "white";
        }
    }
}
function selectCard(){
    if(this.style.backgroundColor.includes("white")){
        if(!scard1){
            scard1 = this;
            let coords = scard1.id.split("-"); //"0-1"-> ["0","1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            scard1.style.backgroundColor = board[r][c] ;
        }
        else if(!scard2 && this != scard1){
            scard2 = this;
            let coords = scard2.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            scard2.style.backgroundColor= board[r][c] ;
            setTimeout(update, 1000);
        }
    }
}
function update(){
    //if cards aren't the same, flip both back
    if(scard1.style.backgroundColor != scard2.style.backgroundColor){
        scard1.style.backgroundColor = "white";
        scard2.style.backgroundColor = "white";
        revealCount = revealCount -2;
        
        errors = errors -1;
        document.getElementById("errors").innerText = errors;
    }
    if(errors == 0){
      document.getElementById("errors").innerText = "Game Over";
      window.location.href = 'gameover.html';
    }
    if(scard1.style.backgroundColor === scard2.style.backgroundColor){
        revealCount = revealCount + 2;
    }
    if(revealCount == 16){
        var element = document.getElementById("heading");
        element.textContent = "😎😎😎YOU WONNN😎😎😎";
        var ans = confirm("Do you want to play the game again?");
        if(ans == true){
            window.location.href = 'memory0.html';
        }
        else{
            window.location.href = '../index.html';
        }
    }
  
     scard1 = null;
    scard2 = null;

}

