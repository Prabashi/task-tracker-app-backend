const db = require("../models");
const Dashboard = db.dashboard;
const Task = db.task;

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

exports.showAll = (req, res) => {
    Dashboard.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving dashboards."
            });
        })
};

exports.viewTasks = (req, res) => {
    Task.find({dashboard: req.params.id})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving tasks of the dashboard."
            });
        })
};

exports.getDashboard = (req, res) => {
    Dashboard.findOne({_id: require('mongodb').ObjectId(req.params.id)})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving dashboard."
            })
        })
}

// exports.setTasks = (dashboard, task) => {
//     dashboard.update({
//         $push: { tasks: task}
//     })
// }
