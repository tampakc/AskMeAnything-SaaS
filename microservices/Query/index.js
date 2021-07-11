const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql");
require("dotenv").config();
const { authenticateToken } = require("./Authenticate");

const dbport = process.env.dbport || 3306;
const dbuser = process.env.dbuser || "querybackend";
const dbpass = process.env.dbpass || "query123";
const dbhost = process.env.dbhost || "localhost";
const dbname = process.env.dbname || "askme_query";
const eventaddr = process.env.eventaddr || "http://localhost:";

const eventport = process.env.eventport || 4005;
const serviceport = process.env.PORT || 4004;

const eventservice = eventaddr + eventport + "/events";

const app = express();
app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
  host: "eu-cdbr-west-01.cleardb.com",
  user: "bf09c3ec1cf783",
  password: "88274128",
  database: "heroku_4ec1f611eb28888",
  //port: dbport,
});

app.get("/query/question/all", (req, res) => {
  const user_id = req.params.userid;
  const questions = [];
  const qids = [];

  con.query(
    "SELECT q.*, u.username FROM question q INNER JOIN user u ON u.user_id = q.user_id",
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
          q.tags = [];
          //console.log(q);
          questions.push(q);
          //console.log(questions);
          qids.push(q.question_id);
        }

        let counter = 2;

        con.query(
          "SELECT a.*, u.username FROM answer a INNER JOIN user u ON u.user_id = a.user_id",
          (err, result, fields) => {
            if (err) {
              res.status(500).send("Database error");
              return;
            }
            for (let ans of result) {
              //console.log(ans);
              const id = ans.question_id;

              const index = qids.indexOf(id);
              questions[index].answers.push(ans);
            }
            counter = counter - 1;
            if (counter == 0) res.status(200).send(questions);
          }
        );
        con.query(
          "SELECT k.keyword_id, k.word, h.question_id FROM keyword k INNER JOIN hasword h ON h.keyword_id = k.keyword_id",
          (err, result, fields) => {
            if (err) {
              res.status(500).send("Database error");
              return;
            }
            for (let word of result) {
              const id = word.question_id;

              const index = qids.indexOf(id);
              questions[index].tags.push({
                word: word.word,
                keyword_id: word.keyword_id,
              });
            }
            counter = counter - 1;

            if (counter == 0) {
              res.status(200).send(questions);
            }
          }
        );
      }
    }
  );
});

app.get("/query/question/all/titles", (req, res) => {
  const user_id = req.params.userid;
  const questions = [];
  const qids = [];

  con.query(
    "SELECT q.title, u.username, q.question_id, u.user_id  FROM question q INNER JOIN user u ON u.user_id = q.user_id",
    [user_id],
    (err, result, fields) => {
      if (err) {
        res.status(500).send("Database error");
        return;
      }
      //console.log(result);
      if (result.length == 0) {
        res.status(404).send();
      } else {
        res.status(200).send(result);
      }
    }
  );
});

app.get("/query/question/bydate", (req, res) => {
  con.query(
    "SELECT q.day AS date, COUNT(*) AS questions FROM (SELECT DATE(timestamp) AS day FROM question) q GROUP BY q.day ORDER BY `day`  ASC",
    (err, result, fields) => {
      if (err) {
        res.status(500).send("Database is down");
      } else {
        for (let a of result) {
          a.date = a.date.toLocaleDateString();
        }
        res.status(200).send(result);
      }
    }
  );
});

app.get("/query/question/:questionid", (req, res) => {
  const question_id = req.params.questionid;
  let counter = 3;
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
        question.answers = [];
      } else {
        question.answers = result;
      }
      counter = counter - 1;

      if (counter == 0) {
        res.status(200).send(question);
      }
    }
  );

  con.query(
    "SELECT k.keyword_id, k.word FROM keyword k INNER JOIN hasword h ON h.keyword_id = k.keyword_id WHERE h.question_id=?",
    [question_id],
    (err, result, fields) => {
      if (err) throw err;
      if (result.length == 0) {
        question.tags = [];
      } else {
        question.tags = result;
      }
      counter = counter - 1;

      if (counter == 0) {
        res.status(200).send(question);
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
    "SELECT q.*, u.username FROM (SELECT * FROM `keyword` WHERE word = ?) k INNER JOIN hasword h ON h.keyword_id = k.keyword_id INNER JOIN question q ON q.question_id = h.question_id INNER JOIN user u ON q.user_id = u.user_id",
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

app.get("/query/dashboard/user", authenticateToken, (req, res) => {
  const user_id = req.user.id;
  let reply = { questions: [], answers: [], contributions: [] };
  let counter = 3;
  con.query(
    "SELECT * FROM question q INNER JOIN user u ON q.user_id = u.user_id WHERE q.user_id = ?",
    [user_id],
    (err, result, fields) => {
      if (err) {
        res.status(500).send("Database error");
        console.log(err);
        return;
      }
      if (result.length > 0) {
        reply.questions = result;
      }
      counter = counter - 1;
      if (counter == 0) res.status(200).send(reply);
    }
  );

  con.query(
    "SELECT a.*, q.title FROM answer a INNER JOIN question q ON q.question_id = a.question_id INNER JOIN user u ON u.user_id = a.user_id WHERE a.user_id = ?",
    [user_id],
    (err, result, fields) => {
      if (err) {
        res.status(500).send("Database error");
        console.log(err);
        return;
      }
      if (result.length > 0) {
        reply.answers = result;
      }

      counter = counter - 1;
      if (counter == 0) res.status(200).send(reply);
    }
  );

  con.query(
    "SELECT date, questions, answers FROM `contributions` WHERE user = ?",
    [user_id],
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send("Database error");
        return;
      }
      if (result.length > 0) {
        for (let a of result) {
          a.date = a.date.toLocaleDateString();
        }
        reply.contributions = result;
      }

      counter = counter - 1;
      if (counter == 0) res.status(200).send(reply);
    }
  );
});

app.get("/query/dashboard/user/daily", authenticateToken, (req, res) => {
  const user_id = req.user.id;

  con.query(
    "SELECT date, questions, answers FROM `contributions` WHERE user = ?",
    [user_id],
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send("Database error");
        return;
      }
      for (let a of result) {
        a.date = a.date.toLocaleDateString();
      }
      res.status(200).send(result);
    }
  );
});

app.post("/events", (req, res) => {
  if (req.body.type == "KeywordsUpdated") {
    let keywords = req.body.data.keywords;
    //console.log(keywords);
    //console.log("Error about to happen");
    const id = req.body.data.id;
    let hasword = [];
    for (let word of keywords) {
      hasword.push([id, word.keyword_id]);
    }
    for (i = 0; i < keywords.length; i++) {
      keywords[i] = [keywords[i].keyword_id, keywords[i].word];
    }
    con.query(
      "INSERT IGNORE INTO keyword(keyword_id, word) VALUES ?",
      [keywords],
      (err, result, fields) => {
        if (err) throw err;
        con.query(
          "INSERT INTO hasword(question_id, keyword_id) VALUES ?",
          [hasword],
          (err, result, fields) => {
            if (err) throw err;
            res.status(200).send();
          }
        );
      }
    );
  } else if (req.body.type == "AnswerPosted") {
    const data = req.body.data;
    const user_id = data.user_id;
    const answer_id = data.answer_id;
    const body = data.answer;
    const time = data.timestamp;
    const question_id = data.question_id;
    con.query(
      "INSERT IGNORE INTO answer(answer_id, question_id, user_id, body, timestamp) VALUES (?)",
      [[answer_id, question_id, user_id, body, time]],
      (err, result, fields) => {
        if (err) throw err;
        res.status(200).send();
      }
    );
  } else if (req.body.type == "QuestionPosted") {
    const data = req.body.data;
    const user_id = data.user_id;
    const question_id = data.question_id;
    const body = data.question;
    const time = data.timestamp;
    const title = data.title;
    con.query(
      "INSERT IGNORE INTO question(question_id, user_id, title, body, timestamp) VALUES (?)",
      [[question_id, user_id, title, body, time]],
      (err, result, fields) => {
        if (err) throw err;
        res.status(200).send();
      }
    );
  } else if (req.body.type == "UserCreated") {
    //console.log("User Created!");
    con.query(
      "INSERT INTO user(user_id, username) VALUES (?)",
      [[req.body.data.user_id, req.body.data.username]],
      (err, result, fields) => {
        if (err) {
          throw err;
          res.status(500).send();
          return;
        }
        res.status(200).send();
      }
    );
  } else {
    res.status(200).send();
  }
});

app.listen(serviceport, () => {
  console.log("Query service listening on port " + serviceport + "...");
});
