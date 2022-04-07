"use strict";

import util from "util";
import mysql from "mysql";

// configuration
export const config = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
};

export const connection = mysql.createConnection(config);

// function for making db requests (returns Promise)
export const execQuery = util.promisify(connection.query.bind(connection));
