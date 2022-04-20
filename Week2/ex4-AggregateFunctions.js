"use strict";

import { connection, execQuery } from "./ex0-dbConfig.js";
import queries from "./ex0-dbQueries.js";

// exercise queries:
const q1 = `SELECT paper_title AS 'Title', COUNT(authors.author_no) AS 'Authors' 
      FROM authors 
      JOIN authors_Papers ON (authors.author_no = authors_Papers.author_no)
      JOIN research_Papers ON (authors_Papers.paper_no = research_Papers.paper_id)
      GROUP BY paper_title;`;
const q2 = `SELECT COUNT(*) AS 'Female Papers'
      FROM authors A JOIN authors_papers B
      ON A.author_no = B.author_no
      WHERE A.gender='F'`;
const q3 = `SELECT university AS 'University', AVG(h_index) AS 'h_index average'
      FROM authors 
      GROUP BY university;`;
const q4 = `SELECT university AS 'University', COUNT(paper_title) AS 'papers total'
      FROM authors 
      JOIN authors_Papers ON (authors.author_no = authors_Papers.author_no)
      JOIN research_Papers ON (research_Papers.paper_id = authors_Papers.paper_no)
      GROUP BY university;`;
const q5 = `SELECT university AS 'University', MIN(h_index) AS 'Min (h_index)', MAX(h_index) AS 'Max (h_index)'
      FROM authors
      GROUP BY university;`;

// querying db
try {
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to DB...");
  });

  // use db `research`
  await execQuery(queries.initQueries[2]);
  const results = await Promise.all(
    [q1, q2, q3, q4, q5].map((query) => execQuery(query))
  );

  console.log("Finished all queries...\nThe results:\n");

  for (const result of results) {
    console.table(result);
  }
} catch (err) {
  console.error(err.message);
} finally {
  connection.end();
  console.log("Disconnected from DB...");
}
