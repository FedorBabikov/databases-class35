"use strict";

import { eachWeekOfInterval, eachMonthOfInterval } from "date-fns";

const universities = [
  "Massachusetts Institute of Technology",
  "University of Oxford",
  "Stanford University",
  "University of Cambridge",
  "University of Amsterdam",
];

// create two arrays of date-strings using `date-fns` package
const birthDates = eachWeekOfInterval({
  start: new Date(1980, 1, 1),
  end: new Date(1980, 5, 3),
})
  .map((date) => date.toISOString().slice(0, 10))
  .slice(0, 15);

const publishDates = eachMonthOfInterval({
  start: new Date(2019, 1, 1),
  end: new Date(2021, 12, 1),
})
  .map((date) => date.toISOString().slice(0, 10))
  .slice(0, 30);

// create array of genders
const genders = [..."FMFMFMFMFMFMFMF"];

export default function createData() {
  // object to be filled with data for DB tables
  const Data = {
    authors: [],
    research_Papers: [],
    authors_Papers: [],
  };

  // populate the `Data` object
  for (let i = 0; i < 15; i++) {
    Data.authors.push([
      `Author-${i + 1}`,
      `${universities[Math.floor(Math.random() * universities.length)]}`,
      `${birthDates[i]}`,
      `${Math.floor(Math.random() * 30) + 10}`,
      `${genders[i]}`,
    ]);
  }

  for (let i = 0; i < 30; i++) {
    Data.research_Papers.push([
      `Title-${i + 1}`,
      `Conference-${30 - i}`,
      `${publishDates[i]}`,
    ]);
  }

  // authors => papers
  for (let author = 0; author < 12; author++) {
    let paper = author + 5;

    while (paper <= 30) {
      Data.authors_Papers.push([author + 1, paper]);
      paper += 4;
    }
  }

  // papers => authors
  for (let paper = 0; paper < 30; paper++) {
    let author = paper + 5;

    while (author <= 12) {
      Data.authors_Papers.push([author, paper + 1]);
      author += 7;
    }
  }

  return Data;
}
