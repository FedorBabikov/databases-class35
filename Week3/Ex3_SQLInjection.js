// SQL-injection value example: `105 OR 1=1`

"use strict";

import prompt from "prompt";
import mysql from "mysql";
import { config } from "./Ex0_config.js";

const configExtended = { ...config, database: "new_world" };
export const conn = mysql.createConnection(configExtended);

// user input validation using REGEXP (first layer of defense)
const schema = {
  properties: {
    name: {
      required: true,
      pattern: /^[a-zA-Z\s]+$/,
      message: "Name must be only letters or spaces",
    },
    code: {
      required: true,
      pattern: /^[A-Z]{3}$/,
      message: "Code must be 3 uppercase letters without spaces",
    },
  },
};

prompt.start();

// get and validate input from user
const { name, code } = await prompt.get(schema);

getPopulationInjectionFree(name, code);

function getPopulationInjectionFree(name, code) {
  // assuming that connection to the database is established and stored as conn
  try {
    conn.connect();

    conn.query(
      // using escape() method on user provided data (second layer of defense)
      `SELECT * FROM Country WHERE Name = ? AND Code = ?`,
      [name, code],
      function (err, results, fields) {
        if (err) throw err;
        if (results.length === 0) throw new Error("Country not found");

        console.log(
          `\n${results[0].Name} has population of ${results[0].Population}.`
        );
      }
    );
  } catch (err) {
    console.error(err.message);
  } finally {
    conn.end();
  }
}
