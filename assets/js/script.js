var myCards = document.getElementById("container");
var resultsArray = [];
var counter = 0;
var text = document.getElementById("text");
var seconds = 0;
var tens = 0;
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var Interval ;
var images = [
  "drinker",
  "strong",
  "healthy",
  "traveller",
  "peaceful",
  "happy"

];
var clone = images.slice(0); // duplicate array
var cards = images.concat(clone); // merge to arrays
var gameStarted = false; // Variable to track whether the game has started

// Shuffel function
function shuffle(r){
  for(var j, x, i = r.length; i; j = Math.floor(Math.random() * i),
  x = r[--i], r[i] = r[j], r[j] = x);
  return r;
}
shuffle(cards);
for (var i = 0; i < cards.length; i++) {
  card = document.createElement("div");
  card.dataset.item = cards[i];
  card.dataset.view = "card";
  myCards.appendChild(card);
  card.onclick = function () {
    if (this.className !="flipped" && this.className != "correct"){
        this.className ="flipped";
        var result = this.dataset.item;
        resultsArray.push(result);
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    }
    if (resultsArray.length > 1) {
      if (resultsArray[0] === resultsArray[1]) {
        check("correct");
        counter ++;
        win();
        resultsArray = [];
      } else {
        check("reverse");
        resultsArray = [];
      }
    }
  }
};


var check = function(className) {
  var x = document.getElementsByClassName("flipped");
  setTimeout(function() {

    for(var i = (x.length - 1); i >= 0; i--) {
      x[i].className = className;
    }
  },500);
}

var win = function () {

  if(counter === 6) {
    clearInterval(Interval);
    text.innerHTML = "Your time was " + seconds + ":" + tens;
}
    }
    function startTimer () {
  tens++;
  if(tens < 9){
    appendTens.innerHTML = "0" + tens;
    }
  if (tens > 9){
    appendTens.innerHTML = tens;
    }
  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
    }
  if (seconds > 9){
    appendSeconds.innerHTML = seconds;
   }
}

var container = document.getElementById("container");

// audio
container.addEventListener("click", function () {
  if (!gameStarted) { // Check if the game has not started yet
    // Get the audio element
    var audio = document.getElementById("myAudio");

    // Play the audio
    audio.play();

    // Set gameStarted to true to prevent further plays
    gameStarted = true;

    // Start the game logic (e.g., card flipping, timer, etc.)
    startGame();
  }
});

// Function to start the game logic (you can replace this with your existing game logic)
function startGame() {
  // Your existing game logic here
}

// Reset gameStarted to false when the game ends (You can call this function when the game ends)
function endGame() {
  gameStarted = false;
}
