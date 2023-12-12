//imports mongoose package functionality to connect to mongoDB database
//==============================================================
const mongoose = require("mongoose");
//==============================================================

//initializes connection to codexDB in mongoDB via mongoose
//==============================================================
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/googlebooks",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
//==============================================================

//exports mongoDB connection
//==============================================================
module.exports = mongoose.connection;
//==============================================================
