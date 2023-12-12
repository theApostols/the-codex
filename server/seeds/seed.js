//importing utilities, models, & database connection files
//==============================================================
const db = require('../config/connection');
const {User} = require('../models');
const userSeeds = require('./userSeeds.json');
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

    // for (let i = 0; i < thoughtSeeds.length; i++)
    // {
    //   const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
    //   const user = await User.findOneAndUpdate(
    //     { username: thoughtAuthor },
    //     {
    //       $addToSet: {
    //         thoughts: _id,
    //       },
    //     }
    //   );
    // }
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
