const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql");

const port = 3306; //change this

const app = express();
app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
  host: "localhost",
  user: "keywordbackend",
  password: "keyword123",
  database: "askme_keyword",
  port,
});

app.get("/keyword/byquestions", (req, res) => {
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

app.post("/events", (req, res) => {
  con.beginTransaction((err) => {
    if (err) {
      res.status(500).send("Database error");
      con.rollback((err) => {});
      return;
    }
    const keywords = req.body.data.keywords;
    console.log(keywords);
    if (req.body.type == "KeywordsPosted") {
      con.query(
        "INSERT IGNORE INTO keyword VALUES (?)",
        [keywords],
        (err, result, fields) => {
          if (err) {
            res.status(500).send("Database error");
            con.rollback((err) => {});
            return;
          }
          con.query(
            "INSERT IGNORE INTO hasword(question_id, keyword_id) SELECT ?, keyword_id FROM keyword WHERE word IN (?)",
            [req.body.data.id, keywords],
            (err, result, fields) => {
              if (err) {
                res.status(500).send("Database error");
                con.rollback((err) => {});
                return;
              }

              con.commit((err) => {
                res.status(200).send();

                con.query(
                  "SELECT * FROM keyword WHERE word in (?)",
                  [keywords],
                  (err, result, fields) => {
                    if (err) throw err;
                    axios
                      .post("http://localhost:4005/events", {
                        type: "KeywordsUpdated",
                        data: { id: req.body.data.id, keywords: result },
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }
                );
              });
            }
          );
        }
      );
    } else {
      res.status(200).send();
    }
  });
});

app.listen(4003, () => {
  console.log("Listening on port 4003...");
});
