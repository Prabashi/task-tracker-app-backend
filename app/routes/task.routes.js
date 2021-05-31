const { authJwt } = require("../middleware");
const taskController = require("../controllers/task.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/task/add",
    [authJwt.verifyToken],
    taskController.addTask
  );

  app.patch(
    "/task/:id/update",
    [authJwt.verifyToken],
    taskController.updateTask
  )
};