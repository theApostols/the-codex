//imports mongoose functionality, code block schema, & date format utility
//==============================================================
const {Schema, model} = require('mongoose');
const {codeBlockSchema, resourceSchema} = require('./subDocs.js');
const dateFormat = require('../utils/dateFormat.js');
//==============================================================

//initializes comment schema
//==============================================================
const commentSchema = new Schema(
{
  //parentSnippetId is an objectId referring to the snippet this comment was made under
  parentSnippetId:
  {
    type: Schema.Types.ObjectId,
    ref: 'Snippet',
    required: true
  },
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
  //creationDate is a date, default value set to the current timestamp
  creationDate:
  {
    type: Date,
    default: Date.now,
  },
  //editDate is a date, set if a user ever edits their comment
  editDate:
  {
    type: Date,
  }
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

//virtual property for commentSchema which formats the creation date upon query
//==============================================================
commentSchema.virtual('formattedCreationDate').get(function()
{
  return dateFormat(this.creationDate);
});
//==============================================================

//virtual property for commentSchema which formats the edit date upon query
//==============================================================
commentSchema.virtual('formattedEditDate').get(function()
{
  if (this.editDate)
  {
    return dateFormat(this.editDate);
  }
});
//==============================================================

//initializes the comment model using the above schema
//==============================================================
const Comment = model('Comment', commentSchema);
//==============================================================

//exports comment model
//==============================================================
module.exports = Comment;
//==============================================================