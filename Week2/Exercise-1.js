"use strict";

import util from "util";
import mysql from "mysql";

// configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

// function for making db requests (returns Promise)
const execQuery = util.promisify(connection.query.bind(connection));

// composing initial queries and collecting them all in array
const DROP_DB = `DROP DATABASE IF EXISTS research;`;
const CREATE_DB = `CREATE DATABASE research;`;
const USE_DB = `USE research;`;
const CREATE_TBL = `CREATE TABLE authors(
  author_no int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  author_name varchar(255),
  university varchar(255),
  date_of_birth date,
  h_index int,
  gender enum('M', 'F'));`;

// array containing initial queries
const initQueries = [DROP_DB, CREATE_DB, USE_DB, CREATE_TBL];

const addMentor = `ALTER TABLE authors 
ADD COLUMN mentor int,
ADD FOREIGN KEY (mentor)
REFERENCES authors(author_no);`;

// creating db
try {
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to DB...");
  });

  // wait for all the initial queries to finish
  await Promise.all(initQueries.map((query) => execQuery(query)));

  // wait for the ALTER query to finish
  await execQuery(addMentor);
} catch (err) {
  console.error(err.message);
  connection.end();
}

connection.end();
