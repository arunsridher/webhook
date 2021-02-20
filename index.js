const prettyjson = require("prettyjson");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const PORT = process.env.PORT || 5000;

const options = {
  noColor: true,
};

// create an express app and configure it with boadyParser middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public"));

// create our webhook endpoint to recive webhooks from Safaricom
app.post("/hooks/mpesa", (req, res) => {
  filePath = __dirname + "/public/data.txt";
  const data = JSON.stringify(req.body);
  fs.appendFile(filePath, data, function () {
    console.log("DONE");
    res.end();
  });
});

app.get("/", (req, res) => {
  let message = {
    ResponseCode: "00000000",
    ResponseDesc: "success",
  };

  // respond to safaricom servers with a success message
  return res.json(message);
});

const server = app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
