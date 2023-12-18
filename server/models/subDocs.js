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

//initializes resource schema
//==============================================================
const resourceSchema = new Schema(
  {
    //title is a required string
    title:
    {
      type: String,
      required: true,
    },
    //link is a required string
    link:
    {
      type: String,
      required: true,
    },
  });
  //==============================================================

//exports code block schema
//==============================================================
module.exports = {codeBlockSchema, resourceSchema};
//==============================================================