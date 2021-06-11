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
};

exports.updateDashboard = (req, res) => {
  let updatedData = req.body;

  Dashboard.updateOne({_id: require('mongodb').ObjectId(req.params.id)}, {$set: updatedData})
    .then(res.status(200).json({
      statusCode: 200,
      status: 'success'
    }))
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while updating the dashboard"
      })
    })
};

exports.deleteDashboard = (req, res) => {
  // TODO: Remove tasks after Dashboard delete or disable deleting Dashboard until all the tasks of the dashboard is deleted. Find the most convenient way
  Dashboard.deleteOne({_id: require('mongodb').ObjectId(req.params.id)})
    .then(res.status(200).json({
      statusCode: 200,
      status: 'success'
    }))
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Error occurred while deleting the dashboard"
      })
    })
};

// exports.setTasks = (dashboard, task) => {
//     dashboard.update({
//         $push: { tasks: task}
//     })
// }
