const Assignment = require('../models/Assignment');
//const Submission = require('../models/Submission');

// Create assignment
exports.createAssignment = async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get assignments for a student
exports.getAssignmentsForStudent = async (req, res) => {
  try {
    const assignments = await Assignment.find({ assignedTo: req.params.studentId });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

