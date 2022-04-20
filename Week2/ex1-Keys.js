"use strict";

import queries from "./ex0-dbQueries.js";
import { connection, execQuery } from "./ex0-dbConfig.js";

// array containing initial queries
const initQueries = queries.initQueries.slice(0, 4);
const ADD_MENTOR = queries.modifQueries[0];

// querying db
try {
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to DB...");
  });

  // wait for all the initial queries to finish
  await Promise.all(initQueries.map((query) => execQuery(query)));

  // wait for the ALTER query to finish
  await execQuery(ADD_MENTOR);

  console.log("Finished all queries...");
} catch (err) {
  console.error(err.message);
} finally {
  connection.end();
  console.log("Disconnected from DB...");
}
