//imports mongoose functionality, code block schema, & date format utility
//==============================================================
const {Schema, model} = require('mongoose');
const codeBlockSchema = require('./CodeBlock.js');
const commentSchema = require('./Comment.js');
const dateFormat = require('../utils/dateFormat.js');
//==============================================================

//initializes code snippet schema
//==============================================================
const snippetSchema = new Schema(
{
  //username is a required string, referencing the user that created the snippet
  username:
  {
    type: String,
    ref: 'User',
    required: true,
  },
  //snippet text is a required string
  snippetText:
  {
    type: String,
    required: true
  },
  //snippet text is an array of code block subdocuments
  snippetCode: [codeBlockSchema],
  //creationDate is a formatted date, default value set to the current timestamp
  creationDate:
  {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp)
  },
  //editDate is a formatted date, set if a user ever edits their snippet
  editDate:
  {
    type: Date,
    get: (timestamp) => dateFormat(timestamp)
  },
  //comment schema is an array of comment subdocuments
  comments: [commentSchema]
});
//==============================================================

//initializes the snippet model using the above schema
//==============================================================
const Snippet = model('Snippet', snippetSchema);
//==============================================================

//exports snippet model
//==============================================================
module.exports = Snippet;
//==============================================================