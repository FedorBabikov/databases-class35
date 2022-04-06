"use strict";

import { connection, execQuery } from "./Ex0_config.js";
import queries from "./Ex0_dbQueries.js";
import data from "./Ex0_dbData.js";

// object containing queries
const insertQueries = {
  useDatabase: [queries.USE_DB, null],
  insertAccounts: [queries.INSERT_ACCOUNT, data.accounts],
  insertChanges: [queries.INSERT_ACCOUNT_CHANGES, data.changes],
};

async function insertDatabase() {
  try {
    connection.connect((err) => {
      if (err) throw err;
      console.log("Connected to DB...");
    });

    // wait for all the queries to finish
    for (const [description, query] of Object.entries(insertQueries)) {
      await execQuery(query[0], [query[1]]);
    }
  } catch (err) {
    console.error(err.message);
  } finally {
    connection.end();
    console.log("Disconnected from DB...");
  }
}

insertDatabase();
