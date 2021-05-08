const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/all", controller.allAccess);

  app.get("/dashboard", [authJwt.verifyToken], controller.dashboard);

  app.get(
    "/dashboard/add",
    [authJwt.verifyToken, authJwt.isUserLvl1],
    controller.addDashboard
  );

  app.get(
    "/task/add",
    [authJwt.verifyToken],
    controller.addTask
  );
};