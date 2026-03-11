require("dotenv").config();

const express = require('express');
const cors = require('cors');
const database = require('./database');
const authRoutes = require('./routes/auth');
const categoriesRoutes = require('./routes/categories');
const questionsRoutes = require('./routes/questions');

const app = express();



app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/categories', categoriesRoutes);
app.use('/questions', questionsRoutes);

app.get('/',(req,res)=>{
    res.send('Backend running now');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/test-db', async(req,res)=>{
    const [rows] = await database.query('select * from categories');
    res.json(rows);
});

