const sqlite = require("sqlite3").verbose();

async function runDbCommand(db, sqlCommand, message) {
  db.run(sqlCommand, (err) => {
    console.log(message);
    if (err) {
      return console.error(err.message);
    }
  });
}

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
    date TEXT,
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
  runDbCommand(db, createRawGameDataSql, "Create raw game data table");

  // NOTE: Upsert on the date, but do not have date as a primary key

  //// insert some dummy data
  //const insertDummyData = `INSERT INTO raw_game_data (date, appid, name, playtime_2weeks, playtime_forever) VALUES ('2021-08-01', 730, 'Counter-Strike: Global Offensive', 0, 0);`;
  //
  //runDbCommand(db, insertDummyData, "Insert dummy data");
  //
  //// update with some dummy data
  //const updateDummyData = `UPDATE raw_game_data SET playtime_2weeks = 100 WHERE appid = 730;`;
  //
  //runDbCommand(db, updateDummyData, "Update dummy data");

  // create table for raw game data
  db.close((err) => {
    // close the database connection
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
}

async function saveRawData(gameData) {
  // open database in memory
  const db = new sqlite.Database("db/games.db", (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the games SQlite database.");
  });

  // save the entire raw data
  const insertRawGameDataSql = `INSERT INTO raw_game_data (date, appid, name, playtime_2weeks, playtime_forever, img_icon_url, playtime_windows_forever, playtime_mac_forever, playtime_linux_forever, playtime_deck_forever) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

  console.log("Inserting raw game data...");
  console.log(gameData);

  // insert the raw data
  for (const game of gameData.games) {
    const insertRawGameData = db.prepare(insertRawGameDataSql);
    insertRawGameData.run(
      gameData.date,
      game.appid,
      game.name,
      game.playtime_2weeks,
      game.playtime_forever,
      game.img_icon_url,
      game.playtime_windows_forever,
      game.playtime_mac_forever,
      game.playtime_linux_forever,
      game.playtime_deck_forever,
    );
    insertRawGameData.finalize();
  }

  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
}

module.exports = {
  create: create,
  saveRawData: saveRawData,
};
