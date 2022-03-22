"use strict";

import util from "util";
import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const DROP_DATABASE = "DROP DATABASE IF EXISTS meetup";
  const CREATE_DATABASE = "CREATE DATABASE meetup";
  const USE_DATABASE = "USE meetup";

  const CREATE_INVITEES_TABLE = `
  CREATE TABLE IF NOT EXISTS Invitee (
    invitee_no INT,
    invitee_name VARCHAR(100),
    invited_by VARCHAR(100)
  );`;

  const CREATE_ROOMS_TABLE = `
  CREATE TABLE IF NOT EXISTS Room (
    room_no INT,
    room_name VARCHAR(100),
    floor_number INT
  );`;

  const CREATE_MEETINGS_TABLE = `
  CREATE TABLE IF NOT EXISTS Meeting (
    meeting_no INT,
    meeting_title TEXT,
    starting_time DATETIME,
    ending_time DATETIME,
    room_no INT
  );`;

  const dbInit = [
    DROP_DATABASE,
    CREATE_DATABASE,
    USE_DATABASE,
    CREATE_INVITEES_TABLE,
    CREATE_ROOMS_TABLE,
    CREATE_MEETINGS_TABLE,
  ];

  const dbData = {
    invitees: [
      [1, "Person1", "Person5"],
      [2, "Person2", "Person4"],
      [3, "Person3", "Person3"],
      [4, "Person4", "Person2"],
      [5, "Person5", "Person1"],
    ],
    rooms: [
      [1, "Room1", 5],
      [2, "Room2", 4],
      [3, "Room3", 3],
      [4, "Room4", 2],
      [5, "Room5", 1],
    ],
    meetings: [
      [1, "Event 1", "2022-03-11 10:20:30", "2022-03-11 12:30:40", 1],
      [2, "Event 2", "2022-03-12 10:20:30", "2022-03-12 12:30:40", 2],
      [3, "Event 3", "2022-03-13 10:20:30", "2022-03-13 12:30:40", 3],
      [4, "Event 4", "2022-03-14 10:20:30", "2022-03-14 12:30:40", 4],
      [5, "Event 5", "2022-03-15 10:20:30", "2022-03-15 12:30:40", 5],
    ],
  };

  const dbInsertQueries = {
    invitees: `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES ? ;`,
    rooms: `INSERT INTO Room (room_no, room_name, floor_number) VALUES ? ;`,
    meetings: `INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) VALUES ? ;`,
  };

  connection.connect();

  try {
    await Promise.all(dbInit.map((queryString) => execQuery(queryString)));

    for (const [key, value] of Object.entries(dbData)) {
      await execQuery(dbInsertQueries[key], [value]);
    }
  } catch (err) {
    console.error(err.message);
    connection.end();
  }

  connection.end();
}

seedDatabase();
