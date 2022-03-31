"use strict";

import util from "util";
import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "research",
});

const execQuery = util.promisify(connection.query.bind(connection));

const Q1 = `SELECT A.author_name AS Author, B.author_name AS Mentor
    FROM authors A JOIN authors B
    WHERE A.author_no = B.mentor;`;

const Q2 = `
    SELECT authors.*, research_Papers.paper_title
    FROM authors LEFT JOIN authors_Papers ON (authors.author_no = authors_Papers.author_no)
                 LEFT JOIN research_Papers ON (authors_Papers.paper_no = research_Papers.paper_id);`;

const Queries = [Q1, Q2];

try {
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to DB...");
  });

  const results = await Promise.all(Queries.map((query) => execQuery(query)));

  for (const result of results) {
    console.table(result);
  }
} catch (err) {
  console.error(err.message);
  connection.end();
}

connection.end();
