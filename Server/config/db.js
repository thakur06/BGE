const mongoose=require("mongoose");
const connect=async()=>{
  await  mongoose
  .connect("mongodb+srv://bioguest94:abhishek0101@cluster0.74mod.mongodb.net/bge")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));
 
}
module.exports=connect;