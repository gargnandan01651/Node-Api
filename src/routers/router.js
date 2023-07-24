// const { ExpressValidator } = require("express-validator");
const { body, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const MensRanking = require("../models/mens");

const validateData = [body("name").notEmpty().withMessage("Name is required")];
const bodyParser = require("body-parser");
router.use(bodyParser.json());
// router.post("/mens", async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const { name, email } = req.body;
//     console.log(name);
//     const existingUserByName = await MensRanking.findOne({ name }).exec();
//     const existingUserByEmail = await MensRanking.findOne({ email }).exec();
//     if (existingUserByName) {
//       return res
//         .status(409)
//         .json({ error: "User with this name already exists" });
//     }

//     if (existingUserByEmail) {
//       return res
//         .status(409)
//         .json({ error: "User with this email already exists" });
//     }
//     const addNewData = new MensRanking(req.body);
//     const insertData = await addNewData.save();
//     res.status(201).send(insertData);
//   } catch (e) {
//     res.status(400).send("this rank is already exist");
//   }
// });
// router.get("/mens", async (req, res) => {
//   console.log("dfsasfdff");
//   try {
//     const getnData = await MensRanking.find({}).sort({
//       ranking: 1,
//     });
//     res.status(201).send(getnData);
//   } catch (e) {
//     res.status(400).send("this rank is already ds");
//   }
// });
router.get("/mens/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const id = req.params.id;
    const getData = await MensRanking.findById({ _id: id });
    res.status(201).send(getData);
  } catch (e) {
    res.status(400).send("this rank is already exixist");
  }
});
router.patch("/mens/:id", async (req, res) => {
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
    const id = req.params.id;
    const getData = await MensRanking.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).send(getData);
  } catch (e) {
    res.status(400).send("this rank is already exixist");
  }
});
router.delete("/mens/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getData = await MensRanking.findByIdAndDelete(id);
    res.status(201).send(getData);
  } catch (e) {
    res.status(400).send("this rank is already exixist");
  }
});
module.exports = router;
