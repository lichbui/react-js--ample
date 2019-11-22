const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const router = express.Router();
const config = require("./config");
const tokenList = {};
const app = express();
const data = ["first note"];

router.get("/", (req, res) => {
  res.send("Ok");
});

router.post("/login", (req, res) => {
  const postData = req.body;

  const user = {
    email: postData.email,
    name: postData.name
  };

  // do the database authentication here, with user name and password combination.
  const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife });
  const refreshToken = jwt.sign(user, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenLife
  });
  const response = {
    status: "Logged in",
    token: token,
    refreshToken: refreshToken
  };
  tokenList[refreshToken] = response;
  res.status(200).json(response);
});

router.post("/token", (req, res) => {
  // refresh the damn token
  const postData = req.body;
  // if refresh token exists
  if (postData.refreshToken && postData.refreshToken in tokenList) {
    const user = {
      email: postData.email,
      name: postData.name
    };
    const token = jwt.sign(user, config.secret, {
      expiresIn: config.tokenLife
    });
    const response = {
      token: token,
      refreshToken: postData.refreshToken
    };
    // update the token in the list
    tokenList[postData.refreshToken].token = token;
    res.status(200).json(response);
  } else {
    res.status(404).send("Invalid request");
  }
});

router.use(require("./tokenChecker"));

router.get("/secure", (req, res) => {
  // all secured routes goes here
  res.send("I am secured...");
});

router.get("/todo", (req, res) => {
  res.status(200).json(data);
});

router.post("/todo/add", (req, res) => {
  const postData = req.body;
  if (postData.content) {
    data.push(postData.content);
  }
  res.status(200).json(data);
});

router.post("/todo/edit", (req, res) => {
  const postData = req.body;
  if (postData.id && parseInt(postData.id) > 0 && postData.content) {
    data[parseInt(postData.id) - 1] = postData.content;
  }
  res.status(200).json(data);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  //intercepts OPTIONS method
  if ("OPTIONS" === req.method) {
    //respond with 200
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);
app.listen(5000);
