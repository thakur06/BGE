const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connect = require("./config/db");
const roleSkills=require("./routes/roleSkills");
const userRoutes=require("./routes/userRoutes");
dotenv.config();
connect();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/role-skills', roleSkills);
app.use('/user',userRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));