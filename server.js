const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const path = require('path'); 


dotenv.config();

const app = express();
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

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory for EJS templates
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Route to serve the form
app.get('/', (req, res) => {
  res.render('index'); // Render the EJS template
});


// Route to handle form submission
app.post('/submit', (req, res) => {
  const { name, favoriteColor } = req.body;
  res.send(`Thank you for submitting, ${name}! Your favorite color is ${favoriteColor}.`);
});
