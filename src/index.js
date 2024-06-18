import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import models from './models/post';
import routes from './routes';
const db = require("./mongoose");

const app = express();
db.connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
    req.context = {
        models,
    };
    next();
});
app.use('/blog', routes.blog);
app.use('/admin', routes.admin);


app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});

app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
});

app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);