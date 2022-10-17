const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 5000;

const newsCategory = require("./data/allCategory.json");
const newsData = require("./data/news-data.json");

app.use(cors());
app.use(express.json());

// get all news category
app.get("/news-category", (req, res) => {
  return res.json({ status: true, data: newsCategory });
});

// get all news under a category
app.get("/news-category/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  if (categoryId === "08") {
    // all news
    return res.json({ status: true, data: newsData.news_data });
  }

  const data = newsData.news_data.filter((d) => d.category_id === categoryId);

  if (data.length === 0) {
    return res.json({ status: false, data: [] });
  }

  return res.json({ status: true, data });
});

// get single news detail by ID
app.get("/news-details/:newsId", (req, res) => {
  const newsId = req.params.newsId;
  const data = newsData.news_data.filter((d) => d._id === newsId);
  if (data.length === 0) {
    return res.json({ status: false, data: [] });
  }
  return res.json({ status: true, data });
});

app.listen(port, () => {
  console.log(`Example app listening on por ${port}`);
});
module.exports = app;
