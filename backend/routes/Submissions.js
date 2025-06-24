const express = require('express');
const router = express.Router();
const {
  submitAssignment,
  getSubmissionsByAssignmentId,
  getSubmissionsByStudentId, // optional: for students to view their submissions
} = require('../controller/submissionController');

// Student submits an assignment
router.post('/submit', submitAssignment);

// Teacher views all submissions for an assignment
router.get('/assignment/:assignmentId', getSubmissionsByAssignmentId);

//  Student views their own submissions (optional)
// router.get('/student/:studentId', getSubmissionsByStudentId);

module.exports = router;
