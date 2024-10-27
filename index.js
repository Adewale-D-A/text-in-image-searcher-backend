const fs = require("fs");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// app.use(cors());
app.use(
  cors({
    origin: [
      "*",
      process.env.LOCALHOST,
      process.env.LOCALHOST_1,
      process.env.FRONTEND_DOMAIN,
    ],
    credentials: false,
  })
);

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const findTextInImage = require("./routes/find-text-in-image/index");

//all routes to fingerprint's hardware
app.use("/find-text-in-image", findTextInImage);

//endpoint home
app.get("/", (req, res) => {
  res.status(200).send("Image to Text is actively listening");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`image-to-text is listening on ${port}...`);
});
