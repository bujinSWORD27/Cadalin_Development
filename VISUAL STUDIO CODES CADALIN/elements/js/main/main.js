// Note: write the code in the order instructed.
const wordElement = document.querySelector(".word");
const hintElement = document.querySelector(".hint span");
const refreshButton = document.querySelector(".refresh-word");
const checkButton = document.querySelector(".check-word");
const input = document.querySelector("input");
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
  // Random Word
  let randomIndex = Math.floor(Math.random() * words.length);
  let randomObj = words[randomIndex];
  word = randomObj.word.toLowerCase();
  // console.log(randomObj)
  // shuffles characters in a string
  let wordArr = word.split("").sort(() => Math.random() - 0.5);
  let scrambleWord = wordArr.join("");

  /* if the characters are not shuffled successfully, 
  call the initGame() function again*/
  console.log({scrambleWord, word})
  if(scrambleWord === word)
    return initGame();
  
  // Render HTML
  numOfPlays.innerText = num;
  scoreElement.innerText = score;
  wordElement.innerText = scrambleWord;
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
    loseGame(`Time Out! ${word.toUpperCase()} is a correct word`);
  }, 1000)
}

initGame()

// Refresh Game 
refreshButton.addEventListener("click", () => loseGame())

// reset all values ​​except `score` and `number of plays`
function refreshGame(msg){
  if(msg) alert(msg);
  word = '';
  time = 10;
  clearInterval(timer);
  initGame()
}

// GameOver
function gameOver(){
  let msg = `Game Over! You get ${score} points, play again!`;
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

// Win Game
function winGame(msg){
  score++;
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


// Check the word
checkButton.addEventListener("click", () => {
  let answerText = input.value.toLowerCase().trim();
  if(answerText !== word)
    return loseGame(`Oops! ${answerText.toUpperCase()} is not a correct word`);
  
  return winGame(`Congrats! ${answerText.toUpperCase()} is a correct word`)
})
