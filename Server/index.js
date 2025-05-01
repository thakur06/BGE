const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connect = require("./config/db");
dotenv.config();
connect();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/skills', require('./routes/skills'));
app.use('/api/roles', require('./routes/roles'));
app.use('/api/role-skills', require('./routes/roleSkills'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));