const db = require("../models");
const Dashboard = db.dashboard;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.dashboard = (req, res) => {
    res.status(200).send("Dashboard");
};

exports.addDashboard = (req, res) => {
    // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Dashboard
  const dashboard = new Dashboard({
    name: req.body.name,
    description: req.body.description
  });

  // Save Dashboard in the database
  dashboard
    .save(dashboard)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Dashboard."
      });
    });
    // res.status(200).send("Add Dashboard");
};

exports.addTask = (req, res) => {
    res.status(200).send("Add Task");
};