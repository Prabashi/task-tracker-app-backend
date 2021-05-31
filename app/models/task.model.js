module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        description: String,
        dashboard: String,
        estimate: String,
        priority: String,
        status: String
      }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Task = mongoose.model("task", schema);
    return Task;
  };

// const mongoose = require("mongoose");

// const Task = mongoose.model(
//   "Task",
//   new mongoose.Schema({
//     title: String,
//     description: String,
//     dashboard: String, // TODO: Should be mapped with Dashboard model
//     estimate: String, // TODO: Should be able to do calculations on this
//     priority: String, // Enum
//     status: String // Enum
//   })
// );

// module.exports = Dashboard;