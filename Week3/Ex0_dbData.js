"use strict";

// compose and export data collections
const accounts = [
  [100, 1000],
  [101, 2000],
  [102, 3000],
  [103, 4000],
  [104, 5000],
  [105, 6000],
];

const changes = [
  [105, 200, "2022-01-01 10:00:00", "debit"],
  [103, 300, "2022-01-02 11:00:50", "credit"],
  [102, 400, "2022-01-03 12:00:40", "debit"],
  [104, 500, "2022-01-04 13:00:30", "debit"],
  [101, 600, "2022-01-05 14:00:20", "credit"],
  [100, 700, "2022-01-06 15:00:10", "debit"],
];

const transaction = [
  [101, 1000, "2022-01-07 12:00:00", "credit"],
  [102, 1000, "2022-01-07 13:00:00", "debit"],
];

export default { accounts, changes, transaction };
