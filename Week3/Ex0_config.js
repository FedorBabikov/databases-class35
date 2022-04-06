"use strict";

import util from "util";
import mysql from "mysql";

// configuration
export const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

// function for making db requests (returns Promise)
export const execQuery = util.promisify(connection.query.bind(connection));
