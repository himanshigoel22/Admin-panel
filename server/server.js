require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const authRouter = require('./router/auth-router'); 
const serviceRouter = require('./router/service-router')
const contactRouter = require('./router/contact-router');
const adminRouter = require('./router/admin-router');
const connectDb = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');

const corsOptions = {
  origin: ['http://localhost:5173'],
  methods: "GET , POST , PUT , DELETE , PATCH , HEAD",
  credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/form', contactRouter);
app.use('/api/data', serviceRouter);
app.use('/api/admin', adminRouter);

app.use(errorMiddleware);

const PORT = 3000;

connectDb().then(() => {
  app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
  });
});
