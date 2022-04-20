"use strict";

// compose queries and export them
// init queries
const DROP_DB = `DROP DATABASE IF EXISTS research;`;
const CREATE_DB = `CREATE DATABASE research;`;
const USE_DB = `USE research;`;
const CREATE_TBL_AUTHORS = `CREATE TABLE IF NOT EXISTS authors(
  author_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  author_name VARCHAR(255),
  university VARCHAR(255),
  date_of_birth DATE,
  h_index INT,
  gender ENUM('M', 'F'));`;
const CREATE_TBL_RESEARCH_PAPERS = `CREATE TABLE IF NOT EXISTS research_Papers(
  paper_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  paper_title VARCHAR(255), 
  conference VARCHAR(255), 
  publish_date DATE);`;
const CREATE_TBL_AUTHORS_PAPERS = `CREATE TABLE IF NOT EXISTS authors_Papers (
  author_no INT,
  paper_no INT,
  PRIMARY KEY (author_no, paper_no),
  FOREIGN KEY (author_no) REFERENCES authors(author_no),
  FOREIGN KEY (paper_no) REFERENCES research_Papers (paper_id));`;

// insert queries
const INSERT_AUTHORS = `INSERT INTO authors (author_name, university, date_of_birth, h_index, gender) VALUES ? ;`;
const INSERT_RESEARCH_PAPERS = `INSERT INTO research_Papers (paper_title, conference, publish_date) VALUES ? ;`;
const INSERT_AUTHORS_PAPERS = `INSERT INTO authors_Papers (author_no, paper_no) VALUES ? ;`;

// modification queries
const ADD_MENTOR = `ALTER TABLE authors 
  ADD COLUMN mentor INT,
  ADD FOREIGN KEY (mentor) REFERENCES authors(author_no);`;

let updateCaseStr = "";
for (let i = 1; i <= 14; i++) {
  switch (i) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      updateCaseStr += ` WHEN ${i} THEN ${13} `;
      break;
    case 6:
    case 7:
    case 8:
    case 9:
      updateCaseStr += ` WHEN ${i} THEN ${14} `;
      break;
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
      updateCaseStr += ` WHEN ${i} THEN ${15} `;
      break;
  }
}

const UPDATE_AUTHORS = `UPDATE authors
  SET mentor = (CASE author_no ${updateCaseStr} END)
  WHERE author_no > 0;`;

// export queries
const queries = {
  initQueries: [
    DROP_DB,
    CREATE_DB,
    USE_DB,
    CREATE_TBL_AUTHORS,
    CREATE_TBL_RESEARCH_PAPERS,
    CREATE_TBL_AUTHORS_PAPERS,
  ],
  insQueries: {
    authors: INSERT_AUTHORS,
    research_Papers: INSERT_RESEARCH_PAPERS,
    authors_Papers: INSERT_AUTHORS_PAPERS,
  },
  modifQueries: [ADD_MENTOR, UPDATE_AUTHORS],
};

export default queries;
