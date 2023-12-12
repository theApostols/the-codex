//importing models & database connection file
//==============================================================
const models = require('../models');
const db = require('../config/connection');
//==============================================================

//exports function to drop a specific collection
//==============================================================
module.exports = async (modelName) =>
{
  try
  {
    //attempts to find a connection with a name matching that of the provided 'modelName' argument
    let existingCollection = await db.db.listCollections({name: modelName});

    //if the above variable exists, i.e. the collection has at least one data document, drop the collection
    if (existingCollection)
    {
      await db.dropCollection(modelName);
    }
  }
  catch (err) //log any errors that occur to console
  {
    console.log('error seeding database', err);
  }
}
//==============================================================