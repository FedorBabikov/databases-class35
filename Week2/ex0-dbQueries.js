"use strict";

// composing queries and exporting them
export const DROP_DB = `DROP DATABASE IF EXISTS research;`;
export const CREATE_DB = `CREATE DATABASE research;`;
export const USE_DB = `USE research;`;
export const CREATE_TBL_AUTHORS = `CREATE TABLE IF NOT EXISTS authors(
  author_no int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  author_name varchar(255),
  university varchar(255),
  date_of_birth date,
  h_index int,
  gender enum('M', 'F'));`;
export const CREATE_TBL_RESEARCH_PAPERS = `CREATE TABLE IF NOT EXISTS research_Papers (
        paper_id INT, 
        paper_title VARCHAR(255), 
        conference VARCHAR(255), 
        publish_date DATE,
        PRIMARY KEY(paper_id)
    );`;
export const CREATE_TBL_AUTHORS_PAPERS = `CREATE TABLE IF NOT EXISTS authors_Papers (
        author_no INT,
        paper_no INT,
        PRIMARY KEY (author_no, paper_no),
        FOREIGN KEY (author_no) REFERENCES authors(author_no),
        FOREIGN KEY (paper_no) REFERENCES research_Papers (paper_id)
      );`;
export const ADD_MENTOR = `ALTER TABLE authors 
  ADD COLUMN mentor int,
  ADD FOREIGN KEY (mentor) REFERENCES authors(author_no)
;`;
export const INSERT_AUTHORS = `INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor) VALUES ? ;`;
export const INSERT_RESEARCH_PAPERS = `INSERT INTO research_Papers (paper_title, conference, publish_date) VALUES ? ;`;
export const INSERT_AUTHORS_PAPERS = `INSERT INTO authors_Papers (author_no, paper_no) VALUES ? ;`;
