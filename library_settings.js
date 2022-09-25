
const gameSettings = {
  loadNewGame: (name, mode) => {
    const player_data = {
      name,
      mode,
      highestScore:0
    };

    sessionStorage.setItem("playerData", JSON.stringify(player_data));
     location.href="./index.html";
  },

  getGameSettings: () => JSON.parse(sessionStorage.getItem("playerData")),
};