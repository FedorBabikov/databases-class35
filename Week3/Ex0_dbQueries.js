"use strict";

// compose and export DB queries
const DROP_DB = `DROP DATABASE IF EXISTS bank_accounts;`;
const CREATE_DB = `CREATE DATABASE bank_accounts;`;
const USE_DB = `USE bank_accounts;`;

const CREATE_TBL_ACCOUNT = `
  CREATE TABLE accounts (
    account_number INT NOT NULL AUTO_INCREMENT,
    balance BIGINT,
    PRIMARY KEY (account_number)
  );`;

const CREATE_TBL_ACCOUNT_CHANGES = `
  CREATE TABLE account_changes (
    change_number INT NOT NULL AUTO_INCREMENT,
    account_number INT,
    amount BIGINT,
    changed_date DATETIME,
    remark VARCHAR(255),
    PRIMARY KEY (change_number, account_number),
    FOREIGN KEY (account_number) REFERENCES accounts(account_number)
  );`;

const INSERT_ACCOUNT = `INSERT INTO accounts (account_number, balance) VALUES ? ;`;
const INSERT_ACCOUNT_CHANGES = `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES ? ;`;

const TR_START = `START TRANSACTION;`;
const TR_COMMIT = `COMMIT;`;
const TR_ROLLBACK = `ROLLBACK;`;

const creditOperation = `
  UPDATE accounts
  SET balance = balance - 1000
  WHERE account_number = 101;`;

const debitOperation = `
  UPDATE accounts
  SET balance = balance + 1000
  WHERE account_number = 102;`;

export default {
  DROP_DB,
  CREATE_DB,
  USE_DB,
  CREATE_TBL_ACCOUNT,
  CREATE_TBL_ACCOUNT_CHANGES,
  INSERT_ACCOUNT,
  INSERT_ACCOUNT_CHANGES,
  TR_START,
  TR_COMMIT,
  TR_ROLLBACK,
  creditOperation,
  debitOperation,
};
