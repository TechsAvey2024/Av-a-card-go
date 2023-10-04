var myCards = document.getElementById("container");
var resultsArray = [];
var counter = 0;
var text = document.getElementById("text");
var seconds = 0;
var tens = 0;
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var Interval;
var gameTimeout;
var currentRound = 1;
var timeLimits = {1: 15000, 2: 10000, 3: 5000 };
var images = ["drinker", "strong", "healthy", "traveller", "peaceful", "happy"];
var cards = images.concat(images.slice(0)); // duplicate and merge arrays

function shuffle(r) {
    for (var j, x, i = r.length; i; j = Math.floor(Math.random() * i), x = r[--i], r[i] = r[j], r[j] = x);
    return r;
}

function cardClickEvent() {
    if (this.className != "flipped" && this.className != "correct") {
        this.className = "flipped";
        var result = this.dataset.item;
        resultsArray.push(result);
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    }
    if (resultsArray.length > 1) {
        if (resultsArray[0] === resultsArray[1]) {
            check("correct");
            counter++;
            win();
            resultsArray = [];
        } else {
            check("reverse");
            resultsArray = [];
        }
    }
}

function check(className) {
    var x = document.getElementsByClassName("flipped");
    setTimeout(function () {
        for (var i = (x.length - 1); i >= 0; i--) {
            x[i].className = className;
        }
    }, 500);
}

function win() {
    if (counter === 6) {
        clearInterval(Interval);
        clearTimeout(gameTimeout);
        text.innerHTML = "Your time was " + seconds + ":" + tens;
        if (currentRound < 3) {
            alert("Moving to next round!");
            currentRound++;
            resetGame();
            startGame();
        } else {
            alert("Congratulations! You completed all rounds.");
            endGame();
        }
    }
}

function startTimer() {
    tens++;
    if (tens <= 9) appendTens.innerHTML = "0" + tens;
    else if (tens > 9) appendTens.innerHTML = tens;

    if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = (seconds > 9) ? seconds : "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }
}

function startGame() {
    shuffle(cards);
    gameTimeout = setTimeout(function () {
        if (counter < 6) {
            gameOver();
        }
    }, timeLimits[currentRound]);
}

function gameOver() {
    alert("Time's up for this round!");
    resetGame();
    startGame();
}

function resetGame() {
  // Clearing the container
  myCards.innerHTML = "";

  // Shuffling the cards
  shuffle(cards);

  // Populating the container with shuffled cards
  for (var i = 0; i < cards.length; i++) {
      var card = document.createElement("div");
      card.dataset.item = cards[i];
      card.dataset.view = "card";
      card.onclick = cardClickEvent;
      myCards.appendChild(card);
  }

  // Resetting game variables
  counter = 0;
  tens = 0;
  seconds = 0;
  appendTens.innerHTML = "00";
  appendSeconds.innerHTML = "00";
}

// Card click event handler
function cardClickEvent() {
  if (this.className != "flipped" && this.className != "correct") {
      this.className = "flipped";
      var result = this.dataset.item;
      resultsArray.push(result);
      clearInterval(Interval);
      Interval = setInterval(startTimer, 10);
  }

  if (resultsArray.length > 1) {
      if (resultsArray[0] === resultsArray[1]) {
          check("correct");
          counter++;
          win();
          resultsArray = [];
      } else {
          check("reverse");
          resultsArray = [];
      }
  }
}

function endGame() {
    currentRound = 1;
    resetGame();
}

// Audio play logic
var gameStarted = false;
document.getElementById("container").addEventListener("click", function () {
    if (!gameStarted) {
        document.getElementById("myAudio").play();
        gameStarted = true;
        startGame();
    }
});
resetGame();
