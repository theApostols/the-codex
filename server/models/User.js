//imports functionality from mongoose to create models
//==============================================================
const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
//==============================================================

//initializes user schema
//==============================================================
const userSchema = new Schema(
{
  //username is a string, required, must be unique, and has whitespaces trimmed
  username:
  {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email:
  {
    type: String, //email is a string
    required: true, //email is required
    unique: true, //email must be unique
    validate:
    {
      validator: function(email) //email is checked against an email regex to ensure it is valid
      {
        const emailRegex = /^([\w\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        return emailRegex.test(email);
      },
      message: 'The provided email is invalid', //if the validation fails, return this error message
    },
  },
  //password is a required string
  password:
  {
    type: String,
    required: true,
  },
  //image is a string, specifically, the name of an file they've uploaded to be their profile avatar, default set to 'default-profile'
  image:
  {
    type: String,
    default: 'default-profile'
  },
  //snippets is an array of objectIDs of each code snippet created by this user
  snippets: 
  [
    {
      type: Schema.Types.ObjectId,
      ref: 'Snippet',
    }
  ],
  //savedSnippets is an array of objectIDs of each code snippet this user has saved
  savedSnippets:
  [
    {
      type: Schema.Types.ObjectId,
      ref: 'Snippet',
    },
  ],
  //comments is an array of objectIDs of each comment created by this user
  comments: 
  [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
});
//==============================================================

//creates pre-save middleware to hash a user's password upon creation / change
//==============================================================
userSchema.pre('save', async function(next)
{
  try
  {
    if (this.isNew || this.isModified('password'))
    {
      this.password = await bcrypt.hash(this.password, 12);
    }
    next();
  }
  catch (error)
  {
    console.log(error);
    next(error);
  }
});
//==============================================================

//creates a method to compare an incoming password with a hashed password via bcrypt
//==============================================================
userSchema.methods.comparePassword = async function(password)
{
  return bcrypt.compare(password, this.password);
};
//==============================================================

//initializes the user model using the above schema
//==============================================================
const User = model('User', userSchema);
//==============================================================

//exports user model
//==============================================================
module.exports = User;
//==============================================================