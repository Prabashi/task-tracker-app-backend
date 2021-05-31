const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const dbConfig = require("./app/config/db.config");
const db = require("./app/models");
const Role = db.role;

var corsOptions = {
    origin: "http://localhost:3000"
};

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
  
        new Role({
          name: "user_lvl_1"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user_lvl_1' to roles collection");
        });
  
        new Role({
          name: "user_lvl_2"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user_lvl_2' to roles collection");
        });
      }
    });
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to The Tracker application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/dashboard.routes')(app);
require('./app/routes/task.routes')(app);

