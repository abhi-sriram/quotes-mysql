const express = require("express");
const router = express.Router();
const quotes = require("../config/db/quotes");

// get first 200 quotes
router.get("/", async (req, res, next) => {
  try {
    return res.json(await quotes.getQuotes());
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
}),
  // getting all quotes
  router.get("/:page", async (req, res, next) => {
    try {
      if (!req.params.page) {
        return res.json(await quotes.getAllQuotes());
      }
      return res.json(await quotes.getAllQuotes(parseInt(req.params.page)));
    } catch (err) {
      console.error(`Error while getting quotes `, err.message);
      next(err);
    }
  });

// get quote by id
router.get("/quote/:id", async (req, res, next) => {
  try {
    res.json(await quotes.getQuoteById(parseInt(req.params.id)));
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

// Create quote
router.post("/create", async (req, res, next) => {
  if (!req.body.author || !req.body.quote || !req.body.uid) {
    return res.status(400).json({ code: 400, msg: "All fields required" });
  }
  try {
    const creation = await quotes.createQuote(
      req.body.uid,
      req.body.author,
      req.body.quote
    );
    if (creation.code == 200) {
      res.json(creation);
    } else {
      res.status(creation.code).json(creation);
    }
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

// Update quote by id
router.put("/create/:id", async (req, res, next) => {
  try {
    if (!req.body.uid || !req.body) {
      return res.status(400).json({ code: 400, msg: "All fields required" });
    }
    const updation = await quotes.updateQuoteById(
      req.body.uid,
      parseInt(req.params.id),
      req.body
    );
    if (updation.code == 200) {
      res.json(updation);
    } else {
      res.status(updation.code).json(updation);
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      code: 400,
      msg: "Failed",
      err: err.message,
    });
  }
});

// Delete quote by id
router.delete("/delete/:id", async (req, res, next) => {
  try {
    if (!req.body.uid) {
      return res.status(400).json({ code: 400, msg: "All fields required" });
    }
    const deletion = await quotes.deleteQuoteById(
      req.body.uid,
      parseInt(req.params.id)
    );
    if (deletion.code == 200) {
      res.json(deletion);
    } else {
      res.status(deletion.code).json(deletion);
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      code: 400,
      msg: "Failed",
      err: err.message,
    });
  }
});

module.exports = router;
