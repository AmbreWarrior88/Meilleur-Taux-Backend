const express = require("express");
const mongoose = require("mongoose");
const formidable = require("express-formidable");
const cors = require("cors");
const mailgun = require("mailgun-js");

const app = express();

app.use(formidable());

app.use(cors());

mongoose.connect("mongodb://localhost/meilleur-taux-backend", {
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

    // Send Email
    const API_KEY = "key-0e0307189be7ed0249cbb73e7909f8cf";
    const DOMAIN = "mg.lereacteur.io";
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

app.listen(4000, () => {
  console.log("Server has started");
});
