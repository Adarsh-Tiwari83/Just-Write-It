const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//env config
dotenv.config(); //dotenv.config({path:'./config/config.env'}) if not in root folder

//routes import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//mongodb connect
connectDB();

//rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

//listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Running server on ${process.env.DEV_MODE} http://localhost:${PORT}`
      .bgMagenta
  );
});
