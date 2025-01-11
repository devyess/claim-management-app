const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

dotenv.config();
app.use(express.json());
const patientRoutes = require("./routes/patient.routes");
const insurerRoutes = require("./routes/insurer.routes");
const connectDB = require("./config/mongo.config");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();

app.use("/patients", patientRoutes);
app.use("/insurers", insurerRoutes);

app.listen(3000, () => {
    console.log("Server is running");
});