const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const pageRoutes = require('./routes/pageRoutes');
const styleRoutes = require('./routes/styleRoutes');
const jsRoutes = require('./routes/jsRoutes');
const dbRoutes = require('./routes/dbRoutes');

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/', pageRoutes);
app.use('/style', styleRoutes);
app.use('/js', jsRoutes);
app.use('/db', dbRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));