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

const Q1 = `SELECT paper_title AS 'Title', COUNT(paper_title) AS 'Authors' 
      FROM authors 
      JOIN authors_Papers ON (authors.author_no = authors_Papers.author_no)
      JOIN research_Papers ON (authors_Papers.paper_no = research_Papers.paper_id)
      GROUP BY paper_title;`;
const Q2 = `SELECT COUNT(paper_title) AS 'Females Papers'
      FROM authors
      JOIN authors_Papers ON (authors.author_no = authors_Papers.author_no)
      JOIN research_Papers ON (research_Papers.paper_id = authors_Papers.paper_no)
      GROUP BY gender
      HAVING gender = 'F';`;
const Q3 = `SELECT university AS 'University', AVG(h_index) AS 'h_index average'
      FROM authors 
      GROUP BY university;`;
const Q4 = `SELECT university AS 'University', COUNT(paper_title) AS 'papers total'
      FROM authors 
      JOIN authors_Papers ON (authors.author_no = authors_Papers.author_no)
      JOIN research_Papers ON (research_Papers.paper_id = authors_Papers.paper_no)
      GROUP BY university;`;
const Q5 = `SELECT university AS 'University', MIN(h_index) AS 'Min (h_index)', MAX(h_index) AS 'Max (h_index)'
      FROM authors
      GROUP BY university;`;

const Queries = [Q1, Q2, Q3, Q4, Q5];

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
