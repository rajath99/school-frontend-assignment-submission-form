const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


require('./models/school.model');     // Changed to match school.model.js
require('./models/class.model');      // Assuming class.model.js
require('./models/subject.model');    // Assuming subject.model.js
require('./models/teacher.model');    // Assuming teacher.model.js
require('./models/student.model');    // Assuming student.model.js
require('./models/Assignment'); // Assuming assignment.model.js
require('./models/Submission'); // Assuming submission.model.js








// Routes
app.get('/', (req, res) => {
  res.send("Backend is running");
  
});

// Assignment + submission routes
const AssignmentsRoutes = require('./routes/assignments');
const SubmissionsRoutes = require('./routes/submissions');

// Mount Routes
 app.use('/api/assignments', AssignmentsRoutes);
 app.use('/api/submissions', SubmissionsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});