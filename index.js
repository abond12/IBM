const express = require('express');
const bodyParser = require('body-parser');


//Routes
const routerBook = require('./routes/bookRoutes.js');
const router = require('./routes/authRoutes.js');

const session = require('express-session');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(session({secret: "H34td", resave: true, saveUninitialized: true, cookie: {maxAge: 3600000}}))

app.use('/books', routerBook);
app.use('/user', router)

app.listen(port, ()=> {
    console.log(`Server listening on http://localhost:${port}`)
})









