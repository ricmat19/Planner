//requires the express framework for this file
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
//creates a variable to hold the express framework
const app = express();
const plannerRouter = require("./routes/planner");
const booksRouter = require("./routes/books");
const recipesRouter = require("./routes/recipes");
// const googleDriveRouter = require("./routes/googleDrive");
const gmailRouter = require("./routes/gmail");
const loginRouter = require("./routes/login");

//Middleware: Puts the json data in a pages body in a req object, parses the data
app.use(express.json());

//allows for different domains to communicate
app.use(
  cors({
    origin: [process.env.ORIGIN, process.env.REACT_APP_PLANNER_API],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    key: "user",
    secret: [process.env.COOKIE_KEY],
    resave: false,
    saveUninitialized: false,
  })
);

//uses the Express use() method
//the use() method is used to implement middleware on the server
//middleware used to give the server access to programs front-end files
app.use(express.static("public"));

app.use(plannerRouter);
app.use(booksRouter);
app.use(recipesRouter);
// app.use(googleDriveRouter);
app.use(gmailRouter);
app.use(loginRouter);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  require("dotenv").config();

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//uses the Express listen() method
//the listen() is used to run the server on the specified port
app.listen(process.env.PORT, () => {
  console.log(`Server Running on port: ${process.env.PORT}`);
});
