const express = require('express');
const router = express.Router();
const {
  createAssignment,
  getAssignmentsForStudent,
//   getAssignmentsByTeacher,
} = require('../controller/AssignmentController');

//  Teacher creates an assignment
router.post('/create', createAssignment);

//  Student views their assignments
router.get('/student/:studentId', getAssignmentsForStudent);

// //  Teacher views assignments they created
// router.get('/teacher/:teacherId', getAssignmentsByTeacher);

module.exports = router;


// // filepath: c:\school-updated-frontend\school-frontend-assignment-submission-form\backend\routes\assignments.js
// const express = require('express');
// const router = express.Router();

// // Example route
// router.get('/', (req, res) => {
//   res.send('Assignments route');
// });

// module.exports = router;
