const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql");

const port = 3307; //change this

const app = express();
app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
  host: "localhost",
  user: "querybackend",
  password: "query123",
  database: "askme_query",
  port,
});

app.get("/query/question/:questionid", (req, res) => {
  const question_id = req.params.questionid;
  let counter = 2;
  const question = {};

  con.query(
    "SELECT q.*, u.username FROM question q INNER JOIN user u ON u.user_id = q.user_id WHERE q.question_id=?",
    [question_id],
    (err, result, fields) => {
      if (err) throw err;
      if (result.length == 0) {
        res.status(404).send();
      } else {
        for (let key in result[0]) {
          question[key] = result[0][key];
        }
        counter = counter - 1;

        if (counter == 0) {
          res.status(200).send(question);
        }
      }
    }
  );

  con.query(
    "SELECT a.user_id, u.username, a.body, a.timestamp FROM answer a INNER JOIN user u ON u.user_id = a.user_id WHERE a.question_id=?",
    [question_id],
    (err, result, fields) => {
      if (err) throw err;
      if (result.length == 0) {
        res.status(404).send();
      } else {
        question.answers = result;
        counter = counter - 1;

        if (counter == 0) {
          res.status(200).send(question);
        }
      }
    }
  );
});

app.get("/query/user/:userid", (req, res) => {
  const user_id = req.params.userid;
  const questions = [];
  const qids = [];

  con.query(
    "SELECT q.*, u.username FROM question q INNER JOIN user u ON u.user_id = q.user_id WHERE q.user_id=?",
    [user_id],
    (err, result, fields) => {
      if (err) throw err;
      //console.log(result);
      if (result.length == 0) {
        res.status(404).send();
      } else {
        //console.log(result);
        for (let q of result) {
          q.answers = [];
          //console.log(q);
          questions.push(q);
          //console.log(questions);
          qids.push(q.question_id);
        }

        //console.log(qids.toString());

        con.query(
          "SELECT a.*, u.username FROM answer a INNER JOIN user u ON u.user_id = a.user_id WHERE a.question_id IN (" +
            qids.toString() +
            ")",
          (err, result, fields) => {
            if (err) throw err;
            for (let ans of result) {
              //console.log(ans);
              const id = ans.question_id;

              const index = qids.indexOf(id);
              questions[index].answers.push(ans);
            }
            res.status(200).send(questions);
          }
        );
      }
    }
  );
});

app.get("/query/keyword/:keyword", (req, res) => {
  const keyword = req.params.keyword;
  const questions = [];
  const qids = [];

  con.query(
    "SELECT q.* FROM (SELECT * FROM `keyword` WHERE word = ?) k INNER JOIN hasword h ON h.keyword_id = k.keyword_id INNER JOIN question q ON q.question_id = h.question_id",
    [keyword],
    (err, result, fields) => {
      if (err) throw err;
      //console.log(result);
      if (result.length == 0) {
        res.status(404).send();
      } else {
        //console.log(result);
        for (let q of result) {
          q.answers = [];
          //console.log(q);
          questions.push(q);
          //console.log(questions);
          qids.push(q.question_id);
        }

        //console.log(qids.toString());

        con.query(
          "SELECT a.*, u.username FROM answer a INNER JOIN user u ON u.user_id = a.user_id WHERE a.question_id IN (" +
            qids.toString() +
            ")",
          (err, result, fields) => {
            if (err) throw err;
            for (let ans of result) {
              //console.log(ans);
              const id = ans.question_id;

              const index = qids.indexOf(id);
              questions[index].answers.push(ans);
            }
            res.status(200).send(questions);
          }
        );
      }
    }
  );
});

app.listen(4004, () => {
  console.log("Listening on port 4004...");
});
