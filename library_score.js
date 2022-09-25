const scoreshandler = (() => {
  let playerScore = null;

  const highestScore = ()=>{
    const player_data = JSON.parse(sessionStorage.getItem("playerData"));
    const checkSavedHighestScore = JSON.parse(
      localStorage.getItem(player_data.name)
    );
    if(checkSavedHighestScore){
        return checkSavedHighestScore.highestScore
    }else{
        return player_data.highestScore
    }
  }

  return {
    calculateScores: (correctGuesses, guesses) => {
      playerScore = Math.floor((correctGuesses / guesses) * 100);
      const player_data = JSON.parse(sessionStorage.getItem("playerData"));
      let message = "";
      let highestScore = playerScore;
      if (playerScore > player_data.highestScore) {
        const newPlayerData = {
          ...player_data,
          highestScore: playerScore,
        };
        sessionStorage.setItem("playerData", JSON.stringify(newPlayerData));
        localStorage.setItem(player_data.name,JSON.stringify(newPlayerData))
        message = "Congratulations!!🔥🔥🔥 new high score";
        $("#highest_score").text(playerScore);
      } else {
        message = "Good try 👏🏾👏🏾👏🏾, I have seen you do better";
        highestScore = player_data.highestScore;
      }
      const result = {
        message,
        percentage: playerScore,
        highestScore: highestScore,
      };
      return result
    },
    getHighScore : ()=> highestScore()
  };
})();

export default scoreshandler;
