const { authJwt } = require("../middleware");
const dashboardController = require("../controllers/dashboard.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/dashboard/all", [authJwt.verifyToken], dashboardController.showAll);

  app.post(
    "/dashboard/add",
    [authJwt.verifyToken, authJwt.isUserLvl1],
    dashboardController.addDashboard
  );
 
  app.get(
    "/dashboard/:id/tasks",
    [authJwt.verifyToken],
    dashboardController.viewTasks
  );

  app.get(
    "/dashboard/:id",
    [authJwt.verifyToken],
    dashboardController.getDashboard
  );
};