const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbconnection");
const adminRoutes = require("./routes/adminRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: [
      process.env.FORNTEND_URL,
      "https://payroll-management-system-odua.onrender.com",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("the api is runnuing");
});

app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started on ${port}`);
});
