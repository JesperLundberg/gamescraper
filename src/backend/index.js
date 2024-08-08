const config = require("../../config");
const database = require("./database");
const steamApi = require("./steamApi");

async function saveRawDataToDatabase(gameData) {}

const rawGameData = steamApi.getRecentGameData();

database.create();

saveRawDataToDatabase(rawGameData);
