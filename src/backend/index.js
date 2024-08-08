const database = require("./database");
const steamApi = require("./steamApi");

async function main() {
  const rawGameData = await steamApi.getRecentGameData();

  database.create();

  database.saveRawData(rawGameData);
}

main();
