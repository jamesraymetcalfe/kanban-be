const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  due_date: { type: Date, required: false },
  assignee: { type: String, required: false },
  priority_level: { type: String, required: false },
  color: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
});

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
  tickets: [ticketSchema],
});

const projectSchema = new mongoose.Schema({
  firebaseUserId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
  lists: [listSchema],
});


const Project = mongoose.model("Project", projectSchema);

module.exports = Project
