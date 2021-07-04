const express = require("express");
const axios = require("axios");
const mysql = require("mysql");
require("dotenv").config();

const serviceport = process.env.serviceport || 4500;
const dbport = process.env.dbport || 3306;

const app = express();
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "askmebackend",
  password: "askme123",
  database: "askme",
  port: dbport,
});

app.get("/user/:username", (req, res) => {
  const username = req.params.username;

  con.query(
    "SELECT username, password, user_id FROM user WHERE username = ?",
    [username],
    (err, result, fields) => {
      if (err) res.status(500).send("Trouble getting to the database");
      else if (result.length == 0) res.status(401).send();
      else
        res.status(200).send({
          username: result[0].username,
          password: result[0].password,
          user_id: result[0].user_id,
        });
    }
  );
});

app.post("/answer", (req, res) => {
  const question_id = req.body.question_id;
  const answer = req.body.answer;
  const time = req.body.timestamp;
  const user_id = req.body.user_id;

  con.query(
    "INSERT INTO answer(user_id, question_id, body, timestamp) VALUES (?, ?, ?, ?)",
    [user_id, question_id, answer, time],
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send("Database error");
        return;
      }
      res.status(200).send("Answer posted successfully!");
    }
  );
});

app.post("/question", (req, res) => {
  const question = req.body.question;
  const title = req.body.title;
  const user_id = req.body.user_id;
  let keywords = req.body.keywords;
  const time = req.body.timestamp;
  console.log(req.body);

  con.beginTransaction((err) => {
    if (err) {
      //console.log("Error1");
      res.status(500).send("Database error");
      con.rollback((err) => {});
      return;
    }
    for (i = 0; i < keywords.length; i++) {
      keywords[i] = [keywords[i]];
    }
    con.query(
      "INSERT INTO question(user_id, title, body, timestamp) VALUES (?, ?, ?, ?)",
      [user_id, title, question, time],
      (err, result, fields) => {
        if (err) {
          console.log(err);
          res.status(500).send("Database error");
          con.rollback((err) => {});
          return;
        }
        const qid = result.insertId;
        con.query(
          "INSERT IGNORE INTO keyword(word) VALUES ?",
          [keywords],
          (err, result, fields) => {
            if (err) {
              //console.log(err);
              res.status(500).send("Database error");
              con.rollback((err) => {});
              return;
            }
            con.query(
              "INSERT IGNORE INTO hasword(question_id, keyword_id) SELECT ?, keyword_id FROM keyword WHERE word IN (?)",
              [qid, keywords],
              (err, result, fields) => {
                if (err) {
                  //console.log("Error3");
                  res.status(500).send("Database error");
                  con.rollback((err) => {});
                  return;
                }

                con.commit((err) => {
                  res.status(200).send("Question posted successfully");
                });
              }
            );
          }
        );
      }
    );
  });
});

app.get("/statistics/question/bydate", (req, res) => {
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

app.get("/statistics/keyword/byquestion", (req, res) => {
  con.query(
    "SELECT k.word, COUNT(*) as questions FROM `keyword` k INNER JOIN hasword h ON k.keyword_id = h.keyword_id GROUP BY k.keyword_id ORDER BY COUNT(*) DESC",
    (err, result, fields) => {
      if (err) {
        res.status(500).send("Database is down");
      } else {
        res.status(200).send(result);
      }
    }
  );
});

app.get("/statistics/user/:user_id", (req, res) => {
  const user_id = req.params.user_id;

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
      }
      res.status(200).send(result);
    }
  );
});

app.get("/query/user/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  let reply = { questions: [], answers: [] };
  let counter = 2;
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

app.get("/query/question/all/titles", (req, res) => {
  con.query(
    "SELECT q.title, u.username, q.question_id, u.user_id  FROM question q INNER JOIN user u ON u.user_id = q.user_id",
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

app.get("/query/question/all", (req, res) => {
  const questions = [];
  const qids = [];

  con.query(
    "SELECT q.*, u.username FROM question q INNER JOIN user u ON u.user_id = q.user_id",
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

app.listen(serviceport, () => {
  console.log("Data Layer listening on port " + serviceport + "...");
});
