"use strict";

import { connection, execQuery } from "./ex0-dbConfig.js";
import queries from "./ex0-dbQueries.js";

const q1 = `SELECT A.author_name AS Author, B.author_name AS Mentor
    FROM authors A LEFT JOIN authors B
    ON A.mentor = B.author_no;`;

const q2 = `
    SELECT authors.*, research_Papers.paper_title
    FROM authors LEFT JOIN authors_Papers ON (authors.author_no = authors_Papers.author_no)
                 LEFT JOIN research_Papers ON (authors_Papers.paper_no = research_Papers.paper_id);`;

// querying db
try {
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to DB...");
  });

  // use db `research`
  await execQuery(queries.initQueries[2]);
  const results = await Promise.all([q1, q2].map((query) => execQuery(query)));

  for (const result of results) {
    console.table(result);
  }

  console.log("Finished all queries...");
} catch (err) {
  console.error(err.message);
} finally {
  connection.end();
  console.log("Disconnected from DB...");
}
