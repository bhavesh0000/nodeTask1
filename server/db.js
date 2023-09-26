const mongoose = require('mongoose')
const dbURI = ()=>{
    mongoose.connect(process.env.DB_URI,{
        useNewUrlPArser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log(`MongoDB is connected with server: ${mongoose.connection.host}`)
    })
    .catch((err)=>{
        console.error("MongoDB connection error:", err)
    })
}
module.exports = dbURI

