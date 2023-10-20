const { app } = require("../server");
const config = require("../config");
const mongoose = require("mongoose");

mongoose.connect(config.mongoUri);

const db = mongoose.connection;

db.on("open", () => {
  console.log("DB connected");
});

const server = app.listen(config.port, () => {
    console.log(`Server is running on port ${server.address().port}`);
})

