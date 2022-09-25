import game from "./library_card.js";
import scoreshandler from "./library_score.js";
// handles showing image cards and removing cards from the dom

// this is an helper function to generate random un_repeating integers with length specified
// it is used by the application to randomize cards used for the game and also position of each card on the grid
const getRandomNonRepeatingNum = (mode, length) => {
  let arrayOfRandomIndex = [];
  while (arrayOfRandomIndex.length < mode) {
    let randomIndex = Math.floor(Math.random() * length);
    if (arrayOfRandomIndex.indexOf(randomIndex) === -1) {
      arrayOfRandomIndex.push(randomIndex);
    }
  }
  return arrayOfRandomIndex;
};
// the work with the previous function to allocate cards in random position on the grid
const getRandomPlayingCards = (cards, randomIdx) => {
  let playingCards = [];
  let cardId = 1;
  for (let i of randomIdx) {
    let playCard = {
      ...cards[i],
      id: cardId,
      matched: false,
    };
    playingCards.push(playCard);
    cardId++;
  }
  return playingCards;
};
// this is the game class that handles all the players action

$(document).ready(() => {
  // this handles tab switch
  $("#tabs").tabs();

  $("#playnow").click(() => {
    $("#tabs").tabs("option", "active", 2);
  });

  $("#save_btn").click(() => {
    const player_name = $("#name").val();
    const num_of_cards = $("#num_cards").val();

    if (player_name && num_of_cards) {
      gameSettings.loadNewGame(player_name, num_of_cards);
    }
  });
  // fetch player data if any in the session storage and parse it
  const player_data = gameSettings.getGameSettings();
  const mode = parseInt(player_data?.mode);
  // preload images
  const allImages = data.map((img) => {
    let imageElem = new Image();
    imageElem.src = img.src;
    imageElem.alt = img.alt;
    return {
      ...img,
      imageElem,
    };
  });
  //if player has entered necessary information the game can start
  if (player_data) {
    $("#player_name").text(player_data.name);
     $("#highest_score").text(scoreshandler.getHighScore() + "%");

    $(".welcome_card").css("display", "none");
    let randomIndex = getRandomNonRepeatingNum(mode / 2, allImages.length);
    let selectedModeCards = getRandomPlayingCards(allImages, randomIndex);
    selectedModeCards = [...selectedModeCards, ...selectedModeCards];
    randomIndex = getRandomNonRepeatingNum(mode, selectedModeCards.length);
    const playingCards = getRandomPlayingCards(selectedModeCards, randomIndex);
    const newGame = new game(playingCards);
    newGame.loadNewGame();
    $("body").on("click", ".card", (e) => {
      newGame.showCard(e.target.id);
    });
  }
  // handles play again feature
  $("body").on("click", "#play_again", () => {
    window.location.href = "./index.html";
  });
});
