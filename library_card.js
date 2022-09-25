import {displayCards,displayResult} from "./library_cards.js";
import scoreshandler from "./library_score.js";
class game {
  // when called it accepts a playing card parameter and set other necessary properties to zero as default
  constructor(playingCards) {
    this.playCards = [...playingCards];
    this.guesses = 0;
    this.correctGuesses = 0;
    this.card = [];
  }
  // this method use the displayCards function to inject html
  loadNewGame() {
    displayCards(this.playCards);
  }
  //method to handle when to flip a card
  showCard(id) {
    if (this.card.length < 2) {
      this.playCards = this.playCards.map((card) => {
        if (card.id == id) {
          card.show = true;
          this.card.push(card);
          return card;
        }
        return card;
      });
      displayCards(this.playCards);
      if (this.card.length === 2) {
        this.makeMove();
      }
    }
  }
  // this handles comparing the two cards a player flipped matches and perform action based on result of the outcome
  makeMove() {
    let cardOne = this.card[0];
    let cardTwo = this.card[1];
    this.guesses++;
    if (cardOne.name !== cardTwo.name) {
      setTimeout(() => {
        let newplayingCards = this.playCards.map((card) => {
          card.show = false;
          return card;
        });
        displayCards(newplayingCards);
        this.card = [];
      }, 1000);
    } else {
      this.correctGuesses = this.correctGuesses + 1;
      setTimeout(() => {
        let newplayingCards = this.playCards.map((card) => {
          if (cardOne.name === card.name) {
            card.matched = true;
          }
          return card;
        });
        const remainingCards = newplayingCards.filter(
          (card) => !card.matched
        ).length;
        if (remainingCards > 0) {
          displayCards(newplayingCards);
        } else {
          this.showResult();
        }
        this.card = [];
      }, 1000);
    }
  }
  // at the end of the game this method calculate player score and update the session storage accordingly
  showResult() {
  const result = scoreshandler.calculateScores(this.correctGuesses,this.guesses)
    displayResult(result);
  }
}


export default game