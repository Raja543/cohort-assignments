const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");
const cors = require("cors");

// Middleware for parsing request bodies
app.use(bodyParser.json());


// Middleware for enabling CORS
app.use(cors());


//routes
app.use("/admin", adminRouter)
app.use("/user", userRouter)

corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
};

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
