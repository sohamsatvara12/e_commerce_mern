require('dotenv').config();
const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error-middleware");
const multer = require('multer');
const path = require('path');

const authRoute = require("./routers/auth-route");
const crudRoute = require("./routers/crud-route");
const pool = require("./db/conn");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/uploads/products', express.static(path.join(__dirname, 'uploads', 'products')));


app.use("/api/auth", authRoute);
app.use("/api/crud", crudRoute);


app.use(errorMiddleware);

const port = process.env.PORT || 5000;

pool.query('SELECT NOW()', (err, dbRes) => {
  if (err) {
    console.error('Unable to connect to the database:', err.stack);
  } else {
    console.log('Database connected:', dbRes.rows);
    // Start server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
});
