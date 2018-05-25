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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        //console.log(currentIndex + ": " + array[currentIndex].getAttribute('class'));
		    //console.log(randomIndex + ": " + array[randomIndex].getAttribute('class'));
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        // array[currentIndex].setAttribute('class', array[randomIndex].getAttribute('class'));// = array[randomIndex];
        // array[randomIndex].setAttribute('class', temporaryValue.getAttribute('class'));// = temporaryValue;
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
