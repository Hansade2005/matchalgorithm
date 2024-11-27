const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); 

const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questionRoutes');
const clientRoutes = require('./routes/clientRoutes');
const coachRoutes = require('./routes/coachRoutes');


dotenv.config();

const app = express();
app.use(cors())
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});


// App routes
// 1) Auth route 
app.use('/api/auth', authRoutes);
// 2) Use question routes
app.use('/api', questionRoutes);
// 3) Use clientRoute routes
app.use('/api/clients', clientRoutes);
// 4) Use coaches routes
app.use('/api/coaches', coachRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


