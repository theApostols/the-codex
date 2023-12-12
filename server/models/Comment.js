//imports mongoose functionality, code block schema, & date format utility
//==============================================================
const {Schema} = require('mongoose');
const codeBlockSchema = require('./CodeBlock.js');
const dateFormat = require('../utils/dateFormat.js');
//==============================================================

//initializes comment schema
//==============================================================
const commentSchema = new Schema(
{
  //username is a required string, referencing the user that created the comment
  username:
  {
    type: String,
    ref: 'User',
    required: true,
  },
  //comment text is a required string
  commentText:
  {
    type: String,
    required: true
  },
  //comment text is an array of code block subdocuments
  commentCode: [codeBlockSchema],
  //creationDate is a date, default value set to the current timestamp
  creationDate:
  {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp)
  }
});
//==============================================================

//exports comment schema
//==============================================================
module.exports = commentSchema;
//==============================================================