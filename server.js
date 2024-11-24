const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Import routes
const authRoutes = require('./routes/auth');

// Middleware to parse incoming JSON
app.use(express.json());
app.use(cors());

// Set up the route prefix
app.use('/auth', authRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/coaching', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
.catch(err => {
    console.error(err);
});
