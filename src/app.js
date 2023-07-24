const express = require("express");
require("../src/db/conn");
require("dotenv");
const app = express();
const MensRanking = require("../src/models/mens");
const routers = require("../src/routers/router");
const { body, validationResult } = require("express-validator");
// const mongoose = require('mongoose');
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = "yourSecretKey";
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post("/mens", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email } = req.body;
    const existingUserByName = await MensRanking.findOne({ name }).exec();
    const existingUserByEmail = await MensRanking.findOne({ email }).exec();
    if (existingUserByName) {
      return res
        .status(409)
        .json({ error: "User with this name already exists" });
    }

    if (existingUserByEmail) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }
    const addNewData = new MensRanking(req.body);
    const insertData = await addNewData.save();
    const token = jwt.sign(
      { email: addNewData.email, id: addNewData._id },
      secretKey,
      {
        expiresIn: "10000hr",
      }
    );
    res.status(201).send({ user: insertData, tokens: token });
  } catch (e) {
    res.status(400).send("this rank is already exist");
  }
});

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  let token = req.header("Authorization");

  if (token) {
    let user = jwt.verify(token, secretKey);
    email = user.email;
    next();
  } else {
    res.status(401).json({ message: "unauthorised user" });
  }
});
app.use(routers);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
