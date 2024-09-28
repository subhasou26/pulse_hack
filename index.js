
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require("path");
const ejsMate = require("ejs-mate");
const cookieParser = require('cookie-parser');



dotenv.config();


const app = express();


connectDB();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",require('./router/auth'));
app.use("/api/health",require("./router/health_data"));
app.get('/', (req, res) => res.send('Welcome to med friend'));





const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
