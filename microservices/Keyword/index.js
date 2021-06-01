const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql");
const { authenticateToken } = require("../Auth/Authenticate");

const port = 3307; //change this

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

app.post("/event", (req, res) => {
  //we have confirmed that the token is valid so we can continue

  if (req.body.type == "KeywordsPosted") {
    const question_id = req.body.data.question_id;
    const keywords = req.body.data.keywords;
    let counter = keywords.length;

    for (keyword of keywords) {
      const key = keyword;
      con.query(
        "SELECT keyword_id FROM keyword WHERE word=?",
        [key],
        (err, result, fields) => {
          if (err) throw err;

          if (result.length == 0) {
            con.query(
              "INSERT INTO keyword(word) VALUES (?)",
              [key],
              (err, result, fields) => {
                if (err) throw err;
                const keyid = result.insertId;
                con.query(
                  "INSERT INTO hasword(question_id, keyword_id) VALUES (?, ?)",
                  [question_id, keyid],
                  (err, result, fields) => {
                    if (err) throw err;
                    counter = counter - 1;
                    if (counter == 0) {
                      res.status(200).send();
                      axios.post("http://localhost:4005/events", {
                        type: "KeywordsUpdated",
                        data: {
                          question_id,
                          keywords,
                        },
                      });
                    }
                  }
                );
              }
            );
          } else {
            const keyid = result[0].keyword_id;
            con.query(
              "INSERT INTO hasword(question_id, keyword_id) VALUES (?, ?)",
              [question_id, keyid],
              (err, result, fields) => {
                if (err) throw err;
                counter = counter - 1;
                if (counter == 0) {
                  res.status(200).send();
                  axios.post("http://localhost:4005/events", {
                    type: "KeywordsUpdated",
                    data: {
                      question_id,
                      keywords,
                    },
                  });
                }
              }
            );
          }
        }
      );
    }
  }
});

app.listen(4003, () => {
  console.log("Listening on port 4003...");
});
