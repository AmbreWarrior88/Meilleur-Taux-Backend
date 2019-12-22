const express = require("express");
const mongoose = require("mongoose");
const formidable = require("express-formidable");
const cors = require("cors");
const mailgun = require("mailgun-js");

require("dotenv").config();

const app = express();

app.use(formidable());

app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Model Quote
const Quote = mongoose.model("Quote", {
  isSelected: []
  //   category: String,
  //   state: String,
  //   use: String,
  //   current: String,
  //   country: String,
  //   city: String,
  //   amount: Number,
  //   contact: String,
  //   file: Number
});

// CREATE NEW QUOTE
app.post("/add-quote", async (req, res) => {
  try {
    const newQuote = new Quote({
      isSelected: req.fields.isSelected
      //   category: req.fields.category,
      //   state: req.fields.state,
      //   use: req.fields.use,
      //   current: req.fields.current,
      //   country: req.fields.country,
      //   city: req.fields.city,
      //   amount: req.fields.amount,
      //   contact: req.fields.contact,
      //   file: req.fields.file
    });
    await newQuote.save();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// SEND MAIL
app.get("/mail", async (req, res) => {
  try {
    const API_KEY = process.env.API_KEY;
    const DOMAIN = process.env.DOMAIN;
    const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });
    const data = {
      from: "Le Reacteur <postmaster@" + DOMAIN + ">",
      to: email,
      subject: "Votre devis MeilleurTaux.com",
      text: isSelected
    };
    mg.messages().send(data, function(error, body) {
      console.log(body);
    });
    res.json("OK");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
