async function getRecentGameData() {
  const steamAPIGetRecentGamesUri =
    "https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=" +
    config.steamApiKey +
    "&steamid=" +
    config.steamUserId +
    "&format=json";

  console.log(steamAPIGetRecentGamesUri);

  const result = await fetch(steamAPIGetRecentGamesUri);

  const json = await result.json();

  return json.response;
}
