const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db= require('./config/mongoose');

// Use urlencoded to read post requests
app.use(express.urlencoded());
// to use cookie parser
app.use(cookieParser());

app.use(express.static('./assets'));

//we need to tell app to use this express-ejs before routes so that our layouts can be rendered in routes
app.use(expressLayouts);

//extract styles and scripts
app.set('layout extractStyles', true);
app.set('layout extractScripts',true);

//Use Express Router

app.use("/", require("./routes"));

//Use View Engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log(`OOPs!! Error while firing the server: ${err}`);
    return;
  }
  console.log(`Server is fired and running at: ${port}`);
});
