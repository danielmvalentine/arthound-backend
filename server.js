require("dotenv").config();
const app = require("./app");
const connectDB = require("./src/db/connection");

const PORT = process.env.PORT || 4000;

connectDB();

app.listen(PORT, () => {
  console.log(`ArtHound backend running on port ${PORT}`);
  console.log(`Test: http://localhost:${PORT}/hello`);
});