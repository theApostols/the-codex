//importing utilities, models, & database connection files
//==============================================================
const db = require("../config/connection");
const { User, Snippet, Comment } = require("../models");
const userSeeds = require("./userSeeds.json");
const snippetSeeds = require("./snippetSeeds.json");
const commentSeeds = require("./commentSeeds.json");
const cleanDB = require("./clearDB");
//==============================================================

//attempts to connect to the database, clean out any existing data, & then seed it with pre-defined data
//==============================================================
db.once("open", async () => {
  try {
    //clean out current 'User' collection, before filling it with the pre-defined sample user data
    await cleanDB("users");
    await User.create(userSeeds);

    //create an empty array to hold objectIds of seeded snippets
    let snippetIds = [];

    //clean out the 'Snippet' collection, before filling it with the pre-defined sample snippet data
    await cleanDB("snippets");
    for (let snippet = 0; snippet < snippetSeeds.length; snippet++) {
      //extracts objectId & username from each snippet, and add the objectId to the appropriate user's 'snippets' array, plus the array of snippetIds
      const { _id, username } = await Snippet.create(snippetSeeds[snippet]);
      snippetIds.push(_id);
      await User.findOneAndUpdate(
        { username },
        {
          $addToSet: { snippets: _id },
        }
      );
    }

    //clean out the 'Comment' collection, before filling it with the pre-defined sample comment data
    await cleanDB("comments");
    for (let comment = 0; comment < commentSeeds.length; comment++) {
      //deconstruct & reconstruct a new comment's data from via the seeds
      const { username, commentText, commentCode, resources } =
        commentSeeds[comment];
      const newComment = {
        username,
        commentText,
        commentCode,
        resources,
      };

      //append a snippet's objectId value to the new comment as a 'parentSnippetId' property
      newComment.parentSnippetId = snippetIds[comment];

      //create the new comment, then find & add the objectId to the appropriate user's & snippet's 'comments' array
      const { _id, parentSnippetId } = await Comment.create(newComment);
      await User.findOneAndUpdate(
        { username },
        {
          $addToSet: { comments: _id },
        }
      );
      await Snippet.findOneAndUpdate(
        { _id: parentSnippetId },
        {
          $addToSet: { comments: _id },
        }
      );
    }
  } catch (
    err //catch any errors that occur, log them to console, & disconnect from the database
  ) {
    console.error(err);
    process.exit(1);
  }

  //log that the seeding process is complete, & disconnect from the database
  console.log("Seeding Complete");
  process.exit(0);
});
//==============================================================
