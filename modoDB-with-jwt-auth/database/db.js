const mongoose =require('mongoose')

module.exports = async ()=>{
    try{
         await mongoose.connect(process.env.mongoURI)
         .then(()=>{
            console.log("MongoDB connected successfully")
         })
    }
    catch(err)
    {
        console.log(`MongoDB Error : ${err.message}`);
        process.exit();
    }
}