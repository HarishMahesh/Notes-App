const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./config/db");
const userRoute = require("./routes/userRoute");
const notesRoute = require("./routes/notesRoute");
const path = require("path");

const app = express();
dotenv.config();

connectDb();

app.use(express.json());

app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/notes", notesRoute);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("server started in the port 5000");
});

// --------------------------deployment------------------------------
__dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
// --------------------------deployment------------------------------
