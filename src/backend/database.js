const sqlite = require("sqlite3").verbose();

async function create() {
  // open database in memory
  const db = new sqlite.Database("db/games.db", (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the games SQlite database.");
  });

  // save the entire raw data
  const createRawGameDataSql = `CREATE TABLE IF NOT EXISTS raw_game_data (
    date TEXT PRIMARY KEY,
    appid INTEGER NOT NULL,
    name TEXT NOT NULL,
    playtime_2weeks INTEGER,
    playtime_forever INTEGER,
    img_icon_url TEXT,
    playtime_windows_forever INTEGER,
    playtime_mac_forever INTEGER,
    playtime_linux_forever INTEGER,
    playtime_deck_forever INTEGER
  );`;

  // create table for raw game data
  db.run(createRawGameDataSql, (err) => {
    console.log("Create raw game data table");
    if (err) {
      return console.error(err.message);
    }

    console.log("Create raw game data table after");
  });

  // insert some dummy data
  const insertDummyData = `INSERT INTO raw_game_data (date, appid, name, playtime_2weeks, playtime_forever) VALUES ('2021-08-01', 730, 'Counter-Strike: Global Offensive', 0, 0);`;

  db.run(insertDummyData, (err) => {
    console.log("Insert dummy data");
    if (err) {
      return console.error(err.message);
    }

    console.log("Insert dummy data after");
  });

  // update with some dummy data
  const updateDummyData = `UPDATE raw_game_data SET playtime_2weeks = 100 WHERE appid = 730;`;

  db.run(updateDummyData, (err) => {
    console.log("Update dummy data");
    if (err) {
      return console.error(err.message);
    }

    console.log("Update dummy data after");
  });

  // create table for raw game data
  db.close((err) => {
    // close the database connection
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
}

async function saveRawData(gameData) {}

module.exports = {
  create: create,
  saveRawData: saveRawData,
};
