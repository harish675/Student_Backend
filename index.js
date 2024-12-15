const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;
const dotenv = require("dotenv");
const app = express();
require('dotenv').config();
const Routes = require("./routes/route.js");
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();

const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Use the corrected MongoDB connection URI
const uri = "mongodb+srv://harishjadhav675:LTlBclmEqe0AQqY0@cluster0.lk8wa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("school").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
// Routes
app.use('/', Routes);

// Start server with error handling
app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
}).on('error', (err) => {
  console.error("Server error:", err);
});


// mongodb+srv://harishjadhav675:LTlBclmEqe0AQqY0@cluster0.lk8wa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0