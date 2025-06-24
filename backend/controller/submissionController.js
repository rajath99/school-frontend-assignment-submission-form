const Submission = require('../models/Submission');

// Student submits an assignment
exports.submitAssignment = async (req, res) => {
  try {
    const { assignment, student, content } = req.body;

    const existing = await Submission.findOne({ assignment, student });
    if (existing) {
      return res.status(400).json({ message: "Already submitted!" });
    }

    const submission = new Submission({ assignment, student, content });
    await submission.save();

    res.status(201).json({ success: true, data: submission });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Teacher views submissions of a particular assignment
exports.getSubmissionsByAssignmentId = async (req, res) => {
  try {
    const submissions = await Submission.find({ assignment: req.params.assignmentId })
      .populate('student', 'name')
      .populate('assignment', 'title');

    res.status(200).json({ success: true, data: submissions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// // Optional: Student views their submissions
// exports.getSubmissionsByStudentId = async (req, res) => {
//   try {
//     const submissions = await Submission.find({ student: req.params.studentId })
//       .populate('assignment', 'title dueDate');

//     res.status(200).json({ success: true, data: submissions });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
