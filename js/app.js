// Set all variables
// set the ul in HTML page to a constant
const myDeck = document.querySelector('.deck');
// create an empty DocumentFragment object for performance
let fragment = document.createDocumentFragment();
// an array of 8 pair cards
let cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
             "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb",
             "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
             "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
// create an array list of open cards
let openCards = [];
let lockedCards = [];
let count = 0;
let winPage = document.getElementById('win-page');
let gamePage = document.getElementById('game-page');
let buttonPlay = document.querySelector('button');
let sec = 0;
let timerID, selectedCardId;

// start timer
function startTimer() {
  // timer function from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
  function pad (val) {return val > 9 ? val : "0" + val; }

  timerID = setInterval( function() {
    document.getElementById('seconds').innerHTML = pad(++sec%60);
    document.getElementById('minutes').innerHTML = pad(parseInt(sec/60,10));
  }, 1000);
}
/*
 * Display the cards on the page
 *  - shuffle the list of cards using the provided "shuffle" method below
 *  - loop through each card and create its html
 *  - add the cards' html to the page
*/
// Shuffle the cards before create the li element
startTimer();
shuffle(cards);
createCards();

// create cards function
function createCards() {
  // create the li element for all 16 cards
  let i = 0;
  cards.forEach(function(card) {
    i++;
    let li = document.createElement('li');
    li.setAttribute('class', 'card');
    li.setAttribute('id', 'c'+i);
    li.innerHTML = "<i class='" + card + "'></i>";
    fragment.appendChild(li);
  });
  // add the li elements to the HTML page
  myDeck.appendChild(fragment);
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    //return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// Add event listener to respond to card click event
myDeck.addEventListener("click", displayCard, false);
// Add event listener to the Play Again button
buttonPlay.addEventListener('click', function() {
  restartGame();
  let el = document.querySelector('.circle1');
  el.className = 'circle';
  winPage.style.display = 'none';
  gamePage.style.display = 'flex';
});
// Add event listener to restart game
document.querySelector('.restart').addEventListener('click', function() {
  restartGame();
});

// function that open card that is clicked by user
function displayCard(evt) {
  let el = evt.target
  selectedCardId = el.getAttribute('id');
  // if clicking card, no more than 2 cards click and not match
  // display cards
  if (el.tagName === 'LI' && openCards.length < 2 && !el.classList.contains('match')) {
    el.setAttribute('class', 'card open show');
    addToOpenList(el);
    checkCardMatch();
  }
}

// add opened card to the list
function addToOpenList(card) {
  // If clicking the same card, don't add to the list
  if (openCards.length === 1) {
    if (openCards[0].getAttribute('id') === selectedCardId) {
      return;
    }
  }
  openCards.push(card);
}
// check if the two cards match or not
function checkCardMatch() {
  if (openCards.length === 2) {
    moveCounter();
    const card1 = openCards[0].firstElementChild.getAttribute('class');
    const card2 = openCards[1].firstElementChild.getAttribute('class');
    if (card1 === card2) {
      match();
    } else {
      notMatch();
    }
  }
}
// if the cards match, store them in the lockedCards array
// add class match to the card
function match() {
  openCards[0].setAttribute('class', 'card open show match');
  openCards[1].setAttribute('class', 'card open show match');
  lockedCards.push(openCards[0]);
  lockedCards.push(openCards[1]);
  openCards = [];
  // you won the game, display the winning page
  if (lockedCards.length === 16) {
    setTimeout(winGame, 1000);
  }
}
// display count data and winning page
function winGame() {
  clearInterval(timerID);
  document.getElementById('count-moves').textContent = count;
  document.getElementById('count-star').textContent = document.querySelectorAll('.fa-star').length;
  document.getElementById('count-time').textContent = document.querySelector('.timer').textContent;
  winPage.style.display = 'flex';
  gamePage.style.display = 'none';
  setTimeout(function() {
    let el = document.querySelector('.circle');
    el.className = 'circle1';
  }, 100);
}

// if the cards not match, add them to not-match class
// remove them from openCards array
function notMatch() {
  openCards.forEach(function(card) {
    card.classList.add('not-match');
  });

  setTimeout(function() {
    let els = openCards; // somehow i can't use openCards array here
    els.forEach(function(el) {
      el.setAttribute('class', 'card');
    });
    openCards = [];
  }, 1000);

}
// count how many times i clicked two cards
function moveCounter() {
  count += 1;
  document.querySelector('.moves').textContent = count;
  // star rating
  if (count > 25) {
    document.getElementById('star3').className = 'fa fa-star-o';
    document.getElementById('star2').className = 'fa fa-star-o';
  } else if (count > 15) {
    document.getElementById('star3').className = 'fa fa-star-o';
  }
}
// call this to reshuffle the cards and reset all counters
function restartGame() {
  clearInterval(timerID);
  count = 0;
  sec = 0;
  startTimer();
  document.querySelector('.moves').textContent = 0;
  openCards = [];
  lockedCards = [];
  document.getElementById('star3').className = 'fa fa-star';
  document.getElementById('star2').className = 'fa fa-star';
  document.getElementById('star1').className = 'fa fa-star';
  // Removing all cards from an deck
  while (myDeck.firstChild) {
    myDeck.removeChild(myDeck.firstChild);
  }
  shuffle(cards);
  createCards();

}
