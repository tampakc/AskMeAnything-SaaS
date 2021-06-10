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
  user: "ansbackend",
  password: "answer123",
  database: "askme_answer",
  port,
});

app.post("/answer", authenticateToken, (req, res) => {
  //we have confirmed that the token is valid so we can continue

  const question_id = req.body.question_id;
  const answer = req.body.answer;
  const user_id = req.user.id;
  const time = req.body.timestamp;

  con.query(
    "INSERT INTO answer(user_id, question_id, body, timestamp) VALUES (?, ?, ?, ?)",
    [user_id, question_id, answer, time],
    (err, result, fields) => {
      if (err) {
        res.status(500).send("Database error");
        return;
      }
      res.status(200).send(result.insertId.toString());
      axios.post("http://localhost:4005/events", {
        type: "AnswerPosted",
        data: {
          user_id,
          answer_id: result.insertId,
          answer,
          question_id,
          timestamp: time,
        },
      });
    }
  );
});

app.listen(4002, () => {
  console.log("Listening on port 4002...");
});
