const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const flash = require('connect-flash');
const customMware = require('./config/middleware');


//Use Sass
app.use(sassMiddleware({
  src: './assets/scss',
  dest: './assets/css',
  debug: true,
  outputStyle: 'extended',
  prefix: '/css'
}))

// Use urlencoded to read post requests
app.use(express.urlencoded());
// to use cookie parser
app.use(cookieParser());

app.use(express.static("./assets"));

//we need to tell app to use this express-ejs before routes so that our layouts can be rendered in routes
app.use(expressLayouts);

//extract styles and scripts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
//Use View Engine
app.set("view engine", "ejs");
app.set("views", "./views");

//middleware that takes session cookie and encrypts it
app.use(
  session({
    name: "codeial",
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://127.0.0.1:27017/codeial_development",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mogodb setup okay");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
//Use Express Router

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`OOPs!! Error while firing the server: ${err}`);
    return;
  }
  console.log(`Server is fired and running at: ${port}`);
});
