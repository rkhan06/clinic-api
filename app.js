const express = require("express");
// module imports
const clinicController = require("./controllers/clinicController");

const app = express();

// middlewares
app.use(express.json());

// API routes
app.get("/api/clinic", clinicController.getClinics);

// start server
const PORT = process.env.PORT || "3000";
app.listen(PORT, () => {
  console.log(`server running on PORT: ${PORT}`);
});

module.exports = app;
