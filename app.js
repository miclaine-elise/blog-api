require("dotenv").config();
const cors = require("cors");
const express = require("express");
const models = require('./models/post');
const apiPublicRouter = require("./routes/api-public");
const apiPrivateRouter = require("./routes/api-private");

// import models from './models/post';
// import routes from './routes';
const db = require("./mongoose");

const app = express();
db.connectDB();
// const corsOptions = {
//     origin: ['https://soft-fairy-21b84f.netlify.app'],
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
    req.context = {
        models,
    };
    next();
});
app.use('/blog', apiPublicRouter);
app.use('/admin', apiPrivateRouter);

// app.listen(process.env.PORT, () =>
//     console.log(`Example app listening on port ${process.env.PORT}!`),
// );
module.exports = app;