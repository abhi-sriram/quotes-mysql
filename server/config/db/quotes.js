const db = require("../db");
const helper = require("../helper");
const config = require("../db_config");

async function getQuotes(){
  try {

    const rows = await db.query(
      `SELECT id, quote, author FROM quote LIMIT 200`
    );
    return {
      data:rows,
      code:200
    };
  } catch (err) {
    return {
      code: 400,
      msg: "Failed",
      err: err.message,
    };
  }
}

async function getAllQuotes(page = 1) {
  try {
    const offset = helper.getOffset(page, config.listPerPage);

    const rows = await db.query(
      `SELECT id, quote, author FROM quote LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return {
      data,
      meta,
    };
  } catch (err) {
    return {
      code: 400,
      msg: "Failed",
      err: err.message,
    };
  }
}

async function getQuoteById(id) {
  try {
    const quote = await db.query(
      `SELECT id,quote,author FROM quote WHERE id=${id}`
    );
    return {
      quote,
    };
  } catch (err) {
    return {
      code: 400,
      msg: "Failed",
      err: err.message,
    };
  }
}

async function createQuote(uid, author, quote) {
  try {
    const user = await db.query(`SELECT * FROM user WHERE uid=? LIMIT 1`, [
      uid,
    ]);
    if (user.length == 0) {
      return {
        code: 400,
        msg: "User is not logged in",
      };
    }
    await db.query(`INSERT INTO quote(quote,author,uid) VALUES (?,?,?)`, [
      quote,
      author,
      uid,
    ]);
    return {
      code: 200,
      msg: "Success",
    };
  } catch (err) {
    return {
      code: 400,
      msg: "Failed",
      err: err.message,
    };
  }
}

async function updateQuoteById(uid, id, obj) {
  try {
    const user = await db.query(`SELECT * FROM user WHERE uid=? LIMIT 1`, [
      uid,
    ]);
    if (user.length == 0) {
      return {
        code: 400,
        msg: "User is not logged in",
      };
    }
    const data = await db.query(
      `SELECT id,quote,author FROM quote WHERE id=? LIMIT 1`,
      [id]
    );
    data[0].quote = obj.quote ? obj.quote : data[0].quote;
    data[0].author = obj.author ? obj.author : data[0].author;
    await db.query(`UPDATE quote SET quote=?, author=? WHERE id=?`, [
      data[0].quote,
      data[0].author,
      id,
    ]);
    return {
      code: 200,
      msg: "Updated",
    };
  } catch (err) {
    return {
      code: 400,
      msg: "Failed",
      err: err.message,
    };
  }
}

async function deleteQuoteById(uid, id) {
  try {
    const user = await db.query(`SELECT * FROM user WHERE uid=? LIMIT 1`, [
      uid,
    ]);
    console.log(user);
    if (user.length == 0) {
      return {
        code: 400,
        msg: "User is not logged in",
      };
    }
    await db.query(`DELETE FROM quote WHERE id=?`, [id]);
    return {
      code: 200,
      msg: "Deleted",
    };
  } catch (err) {
    return {
      code: 400,
      msg: "Failed",
      err: err.message,
    };
  }
}

module.exports = {
  getQuotes,
  getAllQuotes,
  getQuoteById,
  createQuote,
  updateQuoteById,
  deleteQuoteById,
};
