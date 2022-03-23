"use strict";

import util from "util";
import mysql from "mysql";

// configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

// function for making db requests (returns Promise)
const execQuery = util.promisify(connection.query.bind(connection));

const queries = [
  {
    question: `What are the names of countries with population greater than 8 million?`,
    query: `SELECT Name, Population FROM country WHERE Population > 8000000;`,
  },
  {
    question: `What are the names of countries that have 'land' in their names?`,
    query: `SELECT Name FROM country WHERE Name LIKE '%land%';`,
  },
  {
    question: `What are the names of the cities with population in between 500,000 and 1 million?`,
    query: `SELECT Name, Population FROM city WHERE Population BETWEEN 500000 AND 1000000;`,
  },
  {
    question: `What's the name of all the countries on the continent ‘Europe’?`,
    query: `SELECT Name FROM country WHERE Continent = 'Europe';`,
  },
  {
    question: `List all the countries in the descending order of their surface areas.`,
    query: `SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC;`,
  },
  {
    question: `What are the names of all the cities in the Netherlands?`,
    query: `SELECT Name FROM city WHERE CountryCode = 'NLD';`,
  },
  {
    question: `What is the population of Rotterdam?`,
    query: `SELECT Name, Population FROM city WHERE Name = 'Rotterdam';`,
  },
  {
    question: `What's the top 10 countries by Surface Area?`,
    query: `SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;`,
  },
  {
    question: `What's the top 10 most populated cities?`,
    query: `SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10;`,
  },
  {
    question: `What is the population number of the world?`,
    query: `SELECT SUM(Population) FROM country;`,
  },
];

// logs all the questions and db-answers nicely to console
const outputDBData = (queries, responses) => {
  for (let i = 0; i < queries.length; i++) {
    console.log(`${queries[i].question}\n\n`);

    for (const obj of responses[i]) {
      let output = "";

      for (const [key, value] of Object.entries(obj)) {
        output += `${key}: ${value}, `;
      }

      console.log(output.slice(0, -2));
    }

    console.log("\n\n");
  }
};

connection.connect();

try {
  // make all the requests to db and collect the received data to array
  const responses = await Promise.all(
    queries.map((queryObj) => execQuery(queryObj.query))
  );

  // output both the questions and the db-data
  outputDBData(queries, responses);
} catch (err) {
  console.error(err.message);
  connection.end();
}

connection.end();
