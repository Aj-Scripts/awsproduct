const express =require('express');
const app =express();
require('dotenv').config();
const PORT=process.env.PORT
const morgan =require('morgan');
const cors = require('cors');
const postRoute=require('./routes/postRoute')
const UserRoute=require('./routes/userRoute');
const connectDB = require('./db/connection');




connectDB()


app.use(morgan('dev'));
app.use(cors())
app.use(express.json())
app.use('/product',postRoute);
app.use('/user',UserRoute)





app.listen(PORT,()=>{
    console.log(`Server running successfully on port ${PORT}`)
})