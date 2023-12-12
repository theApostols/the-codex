//imports functionality from mongoose to create models
//==============================================================
const {Schema} = require('mongoose');
//==============================================================

//initializes code block schema
//==============================================================
const codeBlockSchema = new Schema(
{
  //language is a required string
  language:
  {
    type: String,
    required: true,
  },
  //code is a required string
  code:
  {
    type: String,
    required: true,
  },
});
//==============================================================

//exports code block schema
//==============================================================
module.exports = codeBlockSchema;
//==============================================================