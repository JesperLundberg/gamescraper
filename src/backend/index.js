const config = require("../../config");
const database = require("./database");

async function getData() {
  const steamAPIGetRecentGamesUri =
    "https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=" +
    config.steamApiKey +
    "&steamid=" +
    config.steamUserId +
    "&format=json";

  console.log(steamAPIGetRecentGamesUri);

  const result = await fetch(steamAPIGetRecentGamesUri);

  const json = await result.json();

  console.log(json.response.games[0]);

  return json.response;
}

async function saveRawDataToDatabase(gameData) {}

const rawGameData = getData();

database.create();

saveRawDataToDatabase(rawGameData);
