import express from 'express';
import axios from 'axios';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import friendMessages from './messageText.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');


const messages = friendMessages;


app.get('/', async (req, res) => {
    res.render('login.ejs');
})

app.post('/login', async (req, res) => {
    console.log(req.body);
    if (req.body.secretPassword === process.env.SECRET_PASSWORD) {
        res.render('congrats.ejs' , { messages: messages });
    } else {
        res.render('login.ejs', {wrongPassword: true});
    }
})

app.post('/lied', async (req, res) => {
    res.redirect('/');
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});