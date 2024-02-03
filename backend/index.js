const express = require("express");
const cors = require('cors');
const router = require('./routes/index');
// const userRouter  = require("./routes/user");

const app = express();

app.use(express.json())
app.use(cors())
app.use('/api/v1', router);
// app.use('/api/v1/user', userRouter);


app.listen(3000, () => {
    console.log("Listening on port 3000");
});









