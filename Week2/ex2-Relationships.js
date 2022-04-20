"use strict";

import createData from "./ex0-dbData.js";
import queries from "./ex0-dbQueries.js";
import { connection, execQuery } from "./ex0-dbConfig.js";

// collections of queries
const initQueries = queries.initQueries;
const insQueries = queries.insQueries;
const modifQueries = queries.modifQueries;

// object: tables data
const dbData = createData();

// creating and populating db
async function seedDatabase() {
  try {
    connection.connect((err) => {
      if (err) throw err;
      console.log("Connected to DB...");
    });

    // wait for all the initial queries to finish
    await Promise.all(initQueries.map((query) => execQuery(query)));

    // wait for all the insert queries to finish
    for (const [key, value] of Object.entries(dbData)) {
      await execQuery(insQueries[key], [value]);
    }

    // wait for all the modification queries to finish
    await Promise.all(modifQueries.map((query) => execQuery(query)));

    console.log("Finished all queries...");
  } catch (err) {
    console.error(err.message);
  } finally {
    connection.end();
    console.log("Disconnected from DB...");
  }
}

seedDatabase();
