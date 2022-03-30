"use strict";

import util from "util";
import mysql from "mysql";
import {
  DROP_DB,
  CREATE_DB,
  USE_DB,
  CREATE_TBL_AUTHORS,
  ADD_MENTOR,
} from "./ex0-dbQueries.js";

// configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

// function for making db requests (returns Promise)
const execQuery = util.promisify(connection.query.bind(connection));

// array containing initial queries
const initQueries = [DROP_DB, CREATE_DB, USE_DB, CREATE_TBL_AUTHORS];

// creating db
try {
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to DB...");
  });

  // wait for all the initial queries to finish
  await Promise.all(initQueries.map((query) => execQuery(query)));

  // wait for the ALTER query to finish
  await execQuery(ADD_MENTOR);
} catch (err) {
  console.error(err.message);
  connection.end();
}

connection.end();
