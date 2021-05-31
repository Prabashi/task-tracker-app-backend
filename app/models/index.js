const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.dashboard = require("./dashboard.model")(mongoose);
db.task = require("./task.model")(mongoose);

db.ROLES = ["admin", "user_lvl_1", "user_lvl_2"];

module.exports = db;