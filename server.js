import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// Middleware for parsing JSON requests
app.use(express.json());

// MongoDB connection string from environment variables
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = "mernBlog";

// Function to connect to the database
const connectDB = async () => {
  const client = await MongoClient.connect(mongoUri);
  return client;
};

// Middleware for handling database operations with error handling
const withDB = async (operations, res) => {
  let client;
  try {
    client = await connectDB();
    const db = client.db(dbName);
    await operations(db);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error connecting to the database", error });
  } finally {
    if (client) {
      client.close();
    }
  }
};

// Route to get article by name
app.get("/api/article/:name", async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    if (!articleInfo) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(articleInfo);
  }, res);
});

// Route to add comments to an article
app.post("/api/article/:name/add-comments", async (req, res) => {
  const { username, comment } = req.body;
  const articleName = req.params.name;

  if (!username || !comment) {
    return res
      .status(400)
      .json({ message: "Username and comment are required" });
  }

  withDB(async (db) => {
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    if (!articleInfo) {
      return res.status(404).json({ message: "Article not found" });
    }

    const updatedComments = [...articleInfo.comments, { username, comment }];

    await db
      .collection("articles")
      .updateOne(
        { name: articleName },
        { $set: { comments: updatedComments } }
      );

    const updatedArticle = await db
      .collection("articles")
      .findOne({ name: articleName });

    res.status(200).json(updatedArticle);
  }, res);
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
