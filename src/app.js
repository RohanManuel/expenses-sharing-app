require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/users', userRoutes);
app.use('/expenses', expenseRoutes);

app.get('/', (req, res) => {
    res.send('Server is running!');
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
