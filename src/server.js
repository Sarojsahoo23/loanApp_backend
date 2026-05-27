require("dotenv").config();

const app = require("./app");

const connectDB = require("./config/db");
connectDB();
const PORT = process.env.PORT || 5000;


const startServer = async () => {
  try {

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });

  } catch (error) {

    console.log(
      "Server Error:",
      error.message
    );

    process.exit(1);
  }
};

startServer();
