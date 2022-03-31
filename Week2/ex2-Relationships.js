"use strict";

import util from "util";
import mysql from "mysql";
import { createData } from "./ex0-dbData.js";
import {
  getInitQueries,
  getInsertQueries,
  getModificationQueries,
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
const initQueries = getInitQueries();

// object containing insert queries
const insertQueries = getInsertQueries();

// array containing modification queries
const modificationQueries = getModificationQueries();

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

    // wait for all the modification queries to finish
    await Promise.all(modificationQueries.map((query) => execQuery(query)));
  } catch (err) {
    console.error(err.message);
    connection.end();
  }

  connection.end();
}

seedDatabase();
