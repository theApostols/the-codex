//imports mongoose package functionality to connect to mongoDB database
//==============================================================
const {connect, connection} = require('mongoose');
//==============================================================

//initializes connection to codexDB in mongoDB via mongoose
//==============================================================
connect('mongodb://127.0.0.1:27017/codexDB');
//==============================================================

//exports mongoDB connection
//==============================================================
module.exports = connection;
//==============================================================