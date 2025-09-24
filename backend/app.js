//npm install express ejs dotenv express-validator cors pg
const path = require("node:path");
const express = require("express");
const app = express();
require('dotenv').config();
const cors = require('cors');

//this allows the app to parse form data into req.
app.use(express.urlencoded({ extended: true }));

app.use(cors()); //EXAMPLE EVENTUALLY: Check the link in SET UP: cors block access from any origin except frontend.....
                // in production, pass origin: 'https://your.site'
                // app.use(cors({ origin: 'https://photo-tagging-production-e42e.up.railway.app'}));


app.use(express.json())

//static assets path (CSS, etc.)
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//parse form requests and makes available in req.body
app.use(express.urlencoded({ extended: false }));

//import routes
const indexRouter = require("./routes/indexRouter")
const photoRouter = require('./routes/photoRouter')
const scoreRouter = require('./routes/scoreRouter')

//router
app.use("/", indexRouter);
app.use("/photo", photoRouter)
app.use("/score", scoreRouter)

// Error middleware: Every thrown error in the application or the previous middleware function calling `next` with an error as an argument will eventually go to this middleware function
app.use((error, req, res, next) => {
  console.error(`Uhoh something went wrong: ${error}`);
  //with throw new Error("OH NO!");
  // You will  see an OH NO! in the page, with a status code of 500 that can be seen in the network tab of the dev tools
  res.status(500).send(error);
});

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Rest API Express app - listening on port ${PORT}!`);
});