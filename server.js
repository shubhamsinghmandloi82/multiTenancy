const express = require('express')
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 4000 ;
const connectDB = require('./services/databaseConnection.js')
connectDB()

app.use(express.json())
app.use('/api/v1',require('./routes/index'))

app.listen(port,()=>{
    console.log(`Server Is Running On Port No . => ${port}`)
})