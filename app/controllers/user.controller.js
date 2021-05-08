exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.dashboard = (req, res) => {
    res.status(200).send("Dashboard");
};

exports.addDashboard = (req, res) => {
    res.status(200).send("Add Dashboard");
};

exports.addTask = (req, res) => {
    res.status(200).send("Add Task");
};