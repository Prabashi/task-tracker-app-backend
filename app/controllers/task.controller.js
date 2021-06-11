const db = require("../models");
const Task = db.task;
const Dashboard = db.task;

exports.addTask = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.estimate) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Task
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    dashboard: req.body.dashboard,
    estimate: req.body.estimate,
    priority: req.body.priority,
    status: req.body.status
  });

  // Save Task in the database
  task
    .save(task)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Task."
      });
    });

    // const dashboard = Dashboard.get(req.body.dashboard);

    // Dashboard.setTasks(dashboard, task);
    // res.status(200).send("Add Task");
};

exports.getTask = (req, res) => {
  Task.findOne({_id: require('mongodb').ObjectId(req.params.id)})
  .then(data => {
      res.send(data)
  })
  .catch(err => {
      res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving task."
      })
  })
};

exports.updateTask = (req, res) => {
  let updatedTask = req.body;

  Task.updateOne({_id: require('mongodb').ObjectId(req.params.id)}, {$set: updatedTask})
    .then(
      res.status(200).json({
        statusCode: 200,
        status: 'success'
      }))
      // data => {res.send(data);})
    .catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving tasks of the dashboard."
      })
    });
};

exports.deleteTask = (req, res) => {
  Task.deleteOne({_id: require('mongodb').ObjectId(req.params.id)})
    .then(res.status(200).json({
      statusCode: 200,
      status: 'success'
    }))
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Error occurred while deleting the task"
      })
    })
};
  // Task.find({id: req.params.id})
  // .then(
    
    
  //   data => {
  //     res.send(data)
  // })
  // .catch(err => {
  //     res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while retrieving tasks of the dashboard."
  //     });
  // })