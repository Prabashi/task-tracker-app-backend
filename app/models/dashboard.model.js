module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        description: String,
        // tasks: []
      }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Dashboard = mongoose.model("dashboard", schema);
    return Dashboard;
  };

// const mongoose = require("mongoose");

// const Dashboard = mongoose.model(
//   "Dashboard",
//   new mongoose.Schema({
//     name: String,
//     description: String
//   })
// );

// module.exports = Dashboard;