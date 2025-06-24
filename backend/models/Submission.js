const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  content: { type: String }, // This could be a file URL or text
  submittedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['submitted', 'pending'], default: 'submitted' }
});

module.exports = mongoose.model('Submission', submissionSchema);