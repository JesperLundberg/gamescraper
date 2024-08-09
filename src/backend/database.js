const sqlite = require("sqlite3").verbose();

const config = require("../../config");

async function runDbCommand(db, sqlCommand, message) {
  db.run(sqlCommand, (err) => {
    console.log(message);
    if (err) {
      return console.error(err.message);
    }
  });
}

async function openDatabase(path) {
  // open database in memory
  const db = new sqlite.Database(path, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the games SQlite database.");
  });

  return db;
}

async function closeDatabase(db) {
  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
}

async function create() {
  const db = await openDatabase(config.databasePath);

  // create the raw data table
  const createRawDataSql = `CREATE TABLE IF NOT EXISTS raw_data (
    date TEXT PRIMARY KEY,
    json TEXT
  );`;

  runDbCommand(db, createRawDataSql, "Create raw data table");

  // save the bronze data
  const createBronzeSql = `CREATE TABLE IF NOT EXISTS raw_game_data (
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
  runDbCommand(db, createBronzeSql, "Create raw game data table");

  // NOTE: Upsert on the date and update all the other fields
  // NOTE: Probably need aggregated primary key on date and appid
  //const upsertBronzeSql = `INSERT INTO raw_game_data (date, appid, name, playtime_2weeks, playtime_forever, img_icon_url, playtime_windows_forever, playtime_mac_forever, playtime_linux_forever, playtime_deck_forever) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(date) DO UPDATE SET playtime_2weeks = ?, playtime_forever = ?, img_icon_url = ?, playtime_windows_forever = ?, playtime_mac_forever = ?, playtime_linux_forever = ?, playtime_deck_forever = ?;`;
  //
  //runDbCommand(db, upsertBronzeSql, "Upsert raw game data");

  //// insert some dummy data
  //const insertDummyData = `INSERT INTO raw_game_data (date, appid, name, playtime_2weeks, playtime_forever) VALUES ('2021-08-01', 730, 'Counter-Strike: Global Offensive', 0, 0);`;
  //
  //runDbCommand(db, insertDummyData, "Insert dummy data");
  //
  //// update with some dummy data
  //const updateDummyData = `UPDATE raw_game_data SET playtime_2weeks = 100 WHERE appid = 730;`;
  //
  //runDbCommand(db, updateDummyData, "Update dummy data");

  closeDatabase(db);
}

async function saveBronzeData(gameData) {
  const db = await openDatabase(config.databasePath);

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

  closeDatabase(db);
}

module.exports = {
  create: create,
  saveBronzeData: saveBronzeData,
};
