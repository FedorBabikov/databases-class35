"use strict";

import { connection, execQuery } from "./Ex0_config.js";
import queries from "./Ex0_dbQueries.js";
import data from "./Ex0_dbData.js";

// object containing queries
const transactionQueries = {
  useDatabase: [queries.USE_DB, null],
  startTransaction: [queries.TR_START, null],
  creditAccount: [queries.creditOperation, null],
  debitAccount: [queries.debitOperation, null],
  insertTransaction: [queries.INSERT_ACCOUNT_CHANGES, data.transaction],
  endTransaction: [queries.TR_COMMIT, null],
};

async function makeTransaction() {
  try {
    connection.connect((err) => {
      if (err) throw err;
      console.log("Connected to DB...");
    });

    // wait for all the queries to finish
    for (const [description, query] of Object.entries(transactionQueries)) {
      await execQuery(query[0], [query[1]]);
    }
  } catch (err) {
    console.error(err.message);
    await execQuery(queries.TR_ROLLBACK);
  } finally {
    connection.end();
    console.log("Disconnected from DB...");
  }
}

makeTransaction();
