import knex from "knex";
import knexfile from "./knexfile";

function database(path: string) {
  let retries = 5;
  while (retries > 0) {
    try {
      const db = knex(knexfile(path).development);
      console.log("DATABASE CONNECTED!");
      return db;
    } catch (error) {
      console.log("Cannot connect to DB!, retrying again...");
      retries -= 1;
      new Promise((res) => setTimeout(res, 2500));
    }
  }
}

export default database;
