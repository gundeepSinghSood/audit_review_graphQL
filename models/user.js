const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  relatedProjects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }
  ],
  toBeReviewed: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }
  ]
});

module.exports = mongoose.model('User', userSchema)