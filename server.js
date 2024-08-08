import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './config/conn.js';
import router from './routes/route.js';
import dotenv from 'dotenv';
import './models/associations.js';

dotenv.config();

const app = express();

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

const PORT = process.env.PORT;

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
