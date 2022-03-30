"use strict";

import util from "util";
import mysql from "mysql";
import { createData } from "./ex0-dbData.js";
import {
  DROP_DB,
  CREATE_DB,
  USE_DB,
  CREATE_TBL_AUTHORS,
  CREATE_TBL_RESEARCH_PAPERS,
  CREATE_TBL_AUTHORS_PAPERS,
  ADD_MENTOR,
  INSERT_AUTHORS,
  INSERT_RESEARCH_PAPERS,
  INSERT_AUTHORS_PAPERS,
} from "./ex0-dbQueries.js";

// configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "research",
});

// function for making db requests (returns Promise)
const execQuery = util.promisify(connection.query.bind(connection));

// array containing initial queries
const initQueries = [
  DROP_DB,
  CREATE_DB,
  USE_DB,
  CREATE_TBL_AUTHORS,
  CREATE_TBL_RESEARCH_PAPERS,
  CREATE_TBL_AUTHORS_PAPERS,
  ADD_MENTOR,
];

// object containing insert queries
const insertQueries = {
  authors: INSERT_AUTHORS,
  research_Papers: INSERT_RESEARCH_PAPERS,
  authors_Papers: INSERT_AUTHORS_PAPERS,
};

// object containing tables data
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
      await execQuery(insertQueries[key], [value]);
    }
  } catch (err) {
    console.error(err.message);
    connection.end();
  }

  connection.end();
}

seedDatabase();
