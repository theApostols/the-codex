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
  //creationDate is a date, default value set to the current timestamp
  creationDate:
  {
    type: Date,
    default: Date.now,
  },
  //editDate is a date, set if a user ever edits their snippet
  editDate:
  {
    type: Date,
  },
  //comment schema is an array of comment subdocuments
  comments: [commentSchema]
},
{
  //allows the display of virtuals when returning JSON data
  toJSON:
  {
    virtuals: true,
  },
  id: false, //excludes extra ID value when returning JSON data
});
//==============================================================

//virtual property for snippetSchema which formats the creation date upon query
//==============================================================
snippetSchema.virtual('formattedCreationDate').get(function()
{
  return dateFormat(this.creationDate);
});
//==============================================================

//virtual property for snippetSchema which formats the edit date upon query
//==============================================================
snippetSchema.virtual('formattedEditDate').get(function()
{
  if (this.editDate)
  {
    return dateFormat(this.editDate);
  }
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