const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], // multiple students
  dueDate: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assignment', assignmentSchema);
