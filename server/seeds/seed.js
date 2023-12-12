//importing utilities, models, & database connection files
//==============================================================
const db = require('../config/connection');
const {User, Snippet} = require('../models');
const userSeeds = require('./userSeeds.json');
const snippetSeeds = require('./snippetSeeds.json');
const cleanDB = require('./clearDB');
//==============================================================

//attempts to connect to the database, clean out any existing data, & then seed it with pre-defined data
//==============================================================
db.once('open', async () =>
{
  try
  {
    //clean out current 'User' collection, before filling it with the pre-defined sample user data
    await cleanDB('users');
    await User.create(userSeeds);

    //clean out the 'Snippet' collection, before filling it with the pre-defined sample snippet data
    await cleanDB('snippets');
    for (let snippet = 0; snippet < snippetSeeds.length; snippet++)
    {
      //extracts objectId & username from each snippet, and add the objectId to the appropriate user's 'snippets' array
      const {_id, username} = await Snippet.create(snippetSeeds[snippet]);
      await User.findOneAndUpdate({username},
      {
        $addToSet:{snippets: _id},
      });
    }
  }
  catch (err) //catch any errors that occur, log them to console, & disconnect from the database
  {
    console.error(err);
    process.exit(1);
  }

  //log that the seeding process is complete, & disconnect from the database
  console.log('seeding complete');
  process.exit(0);
});
//==============================================================