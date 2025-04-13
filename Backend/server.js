const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const pageRoutes = require('./routes/pageRoutes');
const path = require('path');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/', pageRoutes);
app.use(express.static(path.join(__dirname, '../Frontend')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));