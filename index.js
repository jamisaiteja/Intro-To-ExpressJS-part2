const express = require("express");
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");
const app = express();

const dbName = path.join(__dirname, "goodreads.db");
let db = null;
const initializeDBandServer = async () => {
  try {
    db = await open({
      filename: dbName,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is ruing at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB error ${e.message}`);
    process.exit(1);
  }
};

initializeDBandServer();

app.get("/books/", async (request, response) => {
  const getBookQuery = `SELECT * FROM book ORDER BY book_id; `;
  const booksArray = await db.all(getBookQuery);
  response.send(booksArray);
});
