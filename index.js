const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");
const Routes = require("./routes/route.js");

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://harishjadhav675:LTlBclmEqe0AQqY0@cluster0.lk8wa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors());

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected successfully via Mongoose"))
  .catch((err) => {
    console.error("❌ MongoDB connection error via Mongoose:", err.message);
    process.exit(1);
  });

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function runMongoClient() {
  try {
    await client.connect();
    await client.db("school").command({ ping: 1 });
    console.log("✅ Pinged your deployment. Successfully connected to MongoDB via MongoClient!");
  } catch (err) {
    console.error("❌ MongoDB connection error via MongoClient:", err.message);
  } finally {
    await client.close();
  }
}

runMongoClient().catch(console.dir);

app.use("/", Routes);

app.listen(PORT, () => {
  console.log(`🚀 Server started successfully at port ${PORT}`);
}).on("error", (err) => {
  console.error("❌ Server error:", err.message);
});
