const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql");
const { authenticateToken } = require("../Auth/Authenticate");

const port = 3306; //change this

const app = express();
app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
  host: "localhost",
  user: "questionbackend",
  password: "question123",
  database: "askme_question",
  port,
});

app.get("/question/:id", async (req, res) => {});

app.post("/question", authenticateToken, (req, res) => {
  //we have confirmed that the token is valid so we can continue

  const question = req.body.question;
  const title = req.body.title;
  const user_id = req.user.id;
  const keywords = req.body.keywords;
  const time = req.body.timestamp;

  con.query(
    "INSERT INTO question(user_id, title, body, timestamp) VALUES (?, ?, ?, ?)",
    [user_id, title, question, time],
    (err, result, fields) => {
      if (err) {
        res.status(500).send("Database error");
        return;
      }
      res.status(200).send(result.insertId.toString());
      axios
        .post("http://localhost:4005/events", {
          type: "QuestionPosted",
          data: {
            question_id: result.insertId,
            title,
            question,
            timestamp: time,
            user_id,
          },
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .post("http://localhost:4005/events", {
          type: "KeywordsPosted",
          data: {
            id: result.insertId,
            keywords,
          },
        })
        .catch((error) => {
          console.log(error);
        });
    }
  );
});

app.listen(4001, () => {
  console.log("Listening on port 4001...");
});
