const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");
const Authmiddlewareadmin = require("./middleware/admin")
const Authmiddlewareuser = require("./middleware/user")
const PORT = 8080;


app.use(express.json());
app.use(Authmiddlewareadmin);
app.use(Authmiddlewareuser);

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
