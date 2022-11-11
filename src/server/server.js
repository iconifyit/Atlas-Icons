const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const authRoute = require("./routes/auth");
const iconRoute = require("./routes/icon");
const categoryRoute = require("./routes/category");
const iconFontRoute = require("./routes/icon-font");
const dbo = require("./db/conn");

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.static("public"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/auth", authRoute);
app.use("/api/icon", iconRoute);
app.use("/api/category", categoryRoute);
app.use("/api/icon-font", iconFontRoute);

app.listen(port, () => {
  dbo();
  console.log(`Server is running on port: ${port}`);
});