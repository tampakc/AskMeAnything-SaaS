const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const port = 3307; //change this

const app = express();
app.use(express.json());
app.use(cors());

const conn = mysql.createConnection({
  host: "localhost",
  user: "authbackend",
  password: "authenticate123",
  database: "askme_auth",
  port,
});

const secret = fs.readFileSync("secret");

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
});
