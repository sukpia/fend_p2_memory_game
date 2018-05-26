/*
 * Create a list that holds all of your cards
 */
// set the ul in HTML page to a constant
const myDeck = document.querySelector('.deck');
// create an empty DocumentFragment object for performance
let fragment = document.createDocumentFragment();
// an array of 8 pair cards
let cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
             "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb",
             "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
             "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];

/*
 * Display the cards on the page
 *  - shuffle the list of cards using the provided "shuffle" method below
 *  - loop through each card and create its html
 *  - add the cards' html to the page
*/
// Shuffle the cards before create the li element
shuffle(cards);
// create the li element for all 16 cards
cards.forEach(function(card) {
  let li = document.createElement('li');
  li.setAttribute('class', 'card');
  li.innerHTML = "<i class='" + card + "'></i>";
  fragment.appendChild(li);
});
// add the li elements to the HTML page
myDeck.appendChild(fragment);
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
    return array;
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
// function that open card that is clicked by user
function displayCard(evt) {
  let el = evt.target
  if (el.tagName === 'LI') {
    el.setAttribute('class', 'card open show');
    addToOpenList(el);
    checkCardMatch();
  }
}

// create an array list of open cards
let openCards = [];
let lockedCards = [];
// add opened card to the list
function addToOpenList(card) {
  openCards.push(card);
}
// check if the two cards match or not
function checkCardMatch() {
  if (openCards.length === 2) {
    const c1 = openCards[0].firstElementChild.getAttribute('class');
    const c2 = openCards[1].firstElementChild.getAttribute('class');
    if (c1 === c2) {
      match();
    } else {
      notMatch();
    }
    moveCounter();
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
  if (lockedCards.length === 16) {

  }
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
  }, 500);

}
// count how many times i clicked two cards
let count = 0;
function moveCounter() {
  count += 1;
  document.querySelector('.moves').textContent = count;
}
