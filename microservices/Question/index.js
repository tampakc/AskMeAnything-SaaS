const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql");

const port = 3307; //change this

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

app.get("/questions/:id", async (req, res) => {});

app.get("/questions", (req, res) => {});

app.post("/questions", (req, res) => {
    
});

