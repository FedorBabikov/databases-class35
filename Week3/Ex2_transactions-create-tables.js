"use strict";

import { connection, execQuery } from "./Ex0_config.js";
import queries from "./Ex0_dbQueries.js";

// array containing queries
const initQueries = [
  queries.DROP_DB,
  queries.CREATE_DB,
  queries.USE_DB,
  queries.CREATE_TBL_ACCOUNT,
  queries.CREATE_TBL_ACCOUNT_CHANGES,
];

async function seedDatabase() {
  try {
    connection.connect((err) => {
      if (err) throw err;
      console.log("Connected to DB...");
    });

    // wait for all the queries to finish
    await Promise.all(initQueries.map((query) => execQuery(query)));
  } catch (err) {
    console.error(err.message);
  } finally {
    connection.end();
    console.log("Disconnected from DB...");
  }
}

seedDatabase();
