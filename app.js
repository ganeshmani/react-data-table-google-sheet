const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fetch = require("node-fetch");
const cors = require("cors");
const path = require("path");
const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxSvyw8FauN5dZC3we5ee9XlRAldoltWqjJ0UQ0DiTXwgPzSOk/exec";
// EJS

// Express body parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "client", "build")));

app.use(cors());

app.get("/", (req, res) => {
  res.render("dashboard");
});

app.post("/save", (req, res) => {
  console.log("req.body", req.body);
  const rowData = req.body.rowdata;

  Promise.all(
    rowData.map((item) => {
      return new Promise((resolve, reject) => {
        const username = item.username;
        const email = item.email;
        const phone = item.phone;
        const gender = item.gender;
        const url = `${GOOGLE_SHEET_URL}?Name=${encodeURIComponent(
          username
        )}&Email=${encodeURIComponent(email)}&Phone=${encodeURIComponent(
          phone
        )}&Gender=${encodeURIComponent(gender)}`;

        fetch(url)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            console.log("google sheet res", { res });
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    })
  )
    .then((resu) => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json({ success: false });
    });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(3005, () => {
  console.log("Server is running on PORT 3005");
});
