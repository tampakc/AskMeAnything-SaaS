const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql");
require('dotenv').config();

const dbport = process.env.dbport || 3306;
const eventport = process.env.eventport || 4005;
const serviceport = process.env.serviceport || 4003;

const eventservice = "http://localhost:" + eventport + "/events";

const app = express();
app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
  host: "localhost",
  user: "keywordbackend",
  password: "keyword123",
  database: "askme_keyword",
  port: dbport,
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
  if (req.body.type == "KeywordsPosted") {
    let keywords = req.body.data.keywords;
    //console.log("Event KeywordsPosted arrived at Keywords service");
    //console.log(keywords);
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
            [req.body.data.id, keywords],
            (err, result, fields) => {
              if (err) {
                //console.log("Error3");
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
                      .post(eventservice, {
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
    });
  } else {
    res.status(200).send();
  }
});

app.listen(serviceport, () => {
  console.log("Keyword service listening on port " + serviceport + "...");
});