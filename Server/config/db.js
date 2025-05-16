const mongoose=require("mongoose");
const connect=async()=>{
  await  mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));
 
}
module.exports=connect;