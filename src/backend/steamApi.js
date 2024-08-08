const config = require("../../config"); // NOTE: Check out dotenv package for managing environment variables

async function getRecentGameData() {
  const steamAPIGetRecentGamesUri =
    "https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=" +
    config.steamApiKey +
    "&steamid=" +
    config.steamUserId +
    "&format=json";

  const result = await fetch(steamAPIGetRecentGamesUri);

  const json = await result.json();

  return json.response;
}

module.exports = {
  getRecentGameData: getRecentGameData,
};
