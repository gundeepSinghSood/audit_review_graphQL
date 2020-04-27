const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const projectSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  basicInput: {
    reviewerEmail: {
      type: String,
      required: true,
    },
    reviewerName: {
      type: String,
      required: true,
    },
    createdDate: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    }
  }
});

module.exports = mongoose.model('Project', projectSchema)