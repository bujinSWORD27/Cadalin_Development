// Note: write the code in the order instructed.
const wordElement = document.querySelector(".word");
const hintElement = document.querySelector(".hint span");
const refreshButton = document.querySelector(".refresh-word");
const checkElement = document.querySelector(".check-word");
const input = document.querySelector(".input");
const timeElement = document.querySelector(".time span b");
const scoreElement = document.querySelector(".score span");
const numOfPlays = document.querySelector(".num span");

// Initial variables
let word = '';
let timer;
let score = 0;
let num = 3; //Each player has three replays.
let time = 10;

// Initial Game
function initGame(){
    //Random Word
    let randomIndex = Math.floor(Math.random() * words.length);
    let randomObj = words[randomIndex];
    word = randomObj.word.toLowerCase();
    console.log(randomObj)
    // shuffles characters in a string
    let WordArr = word.split("").sort(() => Math.random() - 0.5);
    let scrambleWord = wordArr.join("");
    
    /* if the characters are not shuffled successfully,
    call the initGame() function again*/
    if(scrambleWord === word)
        return initGame();

    // Render HTML
   numOfPlays.innerText =num;
   scoreElement.innerText =score;
   wordElement.innerText =scrambleWord;
   hintElement.innerText = randomObj.hint;
   timeElement.innerText = time;
   input.value = "";
   checkButton.setAttribute("disabled", true);

   // Initial timer
   timer = setInterval(() => {
    if(time > 0){
        time--;
        return timeElement.innerText = time;
       }
       loseGame('Time Out! ${word.toUpperCase()} is a correct word');
    }, 1000)
}

initGame()

//Refresh Game - > reset all values except score and number of plays
refreshButton.addEventListener("click", () => loseGame())

function refreshGame(msg){
    if(msg) alert(msg);
    word='';
    time = 10;
    clearInterval(timer);
    initGame();
}

// Game Over
function gameOver(){
    let msg= 'Game Over! You get ${score} points, play again!';
    num = 3;
    score = 0;
    refreshGame(msg);
}

// Lose game
function loseGame(msg){
    num--;
    if(num < 0)
       return gameOver();

   refreshGame(msg)
}


// Check Input is disabled
input.addEventListener("input", (e) => {
    if(!e.target.value.trim()){
        checkButton.setAttribute("disabled", true);
    }else{
     checkButton.removeAttribute("disabled");
    }
})

//Win Game
function winGame(msg){
    score++;
    refreshGame(msg)
}
// Check the word
checkButton.addEventListener("click", () => {
    let answerText = input.value.toLowerCase().trim();

    console.log(answer.text)
})