const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/authRoute')
const dataRoute = require('./routes/dataRoute')


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
  res.send('Hello World!');
});




app.use('/api/auth', authRoute);
app.use('/api/data', dataRoute);
app.listen(5000, () => {
  console.log('app listening on port 5000.');
});
