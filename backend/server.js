const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const session = require("express-session");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);
const { check, validationResult } = require("express-validator");
app.use(cookieparser());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: "false",
      expires: 60 * 60 * 60,
    },
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login (name,email,password) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.post(
  "/login",
  [
    check("email", "Emaill length error")
      .isEmail()
      .isLength({ min: 10, max: 30 }),
    check("password", "password length 8-14").isLength({ min: 8, max: 14 }),
  ],
  (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json(errors);
      } else {
        if (err) {
          return res.json("Error");
        }
        if (data.length > 0) {
          req.session.name = data[0].name; // Change req.session.username to req.session.name
          //console.log(req.session);
          return res.json({ Login: true, username: req.session.name });
        } else {
          return res.json({ Login: false });
        }
      }
    });
  }
);
app.get("/home", (req, res) => {
  // console.log(req.session);
  if (req.session.name) {
    return res.json({ valid: true, username: req.session.name });
  } else {
    return res.json({ valid: false });
  }
});
app.get("/lists", (req, res) => {
  const sql = "SELECT * FROM login";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.get("/list", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.post("/create", (req, res) => {
  const sql = "INSERT INTO student (Name, Email, Image) VALUES (?, ?, ?)";
  const values = [req.body.Name, req.body.Email, req.body.Image];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.json({ error: "Error occurred while inserting data." });
    }

    return res.json({ success: true, data });
  });
});

app.put("/update/:id", (req, res) => {
  const sql = "UPDATE student SET Name = ?, Email = ?, Image= ? WHERE ID = ?";
  const values = [req.body.Name, req.body.Email, req.body.Image, req.params.id];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.json({ error: "Error occurred while updating data." });
    }

    return res.json({ success: true, data });
  });
});

app.delete("/student/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE ID = ?";
  const value = req.params.id;
  db.query(sql, value, (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ error: "Error occurred while deleting data." });
    }

    return res.json({ success: true, result });
  });
});

const port = 4000; // Choose the port you want to use
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get("/l", (req, res) => {
  res.send("hello");
});
