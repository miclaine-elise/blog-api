require("dotenv").config();
const cors = require("cors");
const express = require("express");
const models = require('./models/post');
const apiPublicRouter = require("./routes/api-public");
const apiPrivateRouter = require("./routes/api-private");
const db = require("./mongoose");

const app = express();
db.connectDB();
const corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//     req.context = {
//         models,
//     };
//     next();
// });
app.use('/blog', apiPublicRouter);
app.use('/admin', apiPrivateRouter);
// home route
app.get("/", (req, res, next) => {
    res.status(200).json({ message: "welcome to the blog home page!" });
});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
    // set error and provide in development
    const message = err.message;
    const error = req.app.get("env") === "development" ? err : {};

    // return error JSON
    res.status(err.status || 500).json({
        error: {
            message,
            status: error.status,
            stack: error.stack,
        },
    });
});

// app.listen(process.env.PORT, () =>
//     console.log(`Example app listening on port ${process.env.PORT}!`),
// );
module.exports = app;