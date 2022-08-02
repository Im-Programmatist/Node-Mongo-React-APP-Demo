// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import express from "express";
import './database/connection.js';

const app = express();
const router = express.Router();
const port = process.env.PORT || 4000;

router.get("/", (req,res) => {
    //function that ends a response for each request
    //res.status(200).json({isConnected: true});
    //res.status(200).send("Hello World");
    //res.status(200).render("Hello World");
    //res.status(200).send({ message: 'hey' });
    //res.status(200).end();
    res.status(200).send("Hello World");
    console.dir(res.headersSent) // true
});

app.get("/student", (req,res) => {
    //res.status(200).send("Hello Students!!!").json({isConnected: true});
    res.status(201);

    res.setHeader("Content-Type", "text/html");
    res.write("<p>Hello Students</p>");

    // res.setHeader("Content-Disposition", "attachment");
    // res.setHeader("Content-Type", "image/png");
    // res.attachment('./views/CHETAN.JPG');

    res.end();
    console.dir(res.headersSent) // true
});

app.get("/download",(req,res)=>{
    res.download('./views/CHETAN.JPG');
    console.dir(res.headersSent) // true
});

app.route('/login')

// show the form (GET http://localhost:8080/login)
.get(function(req, res) {
    res.send('this is the login form');
})

// process the form (POST http://localhost:8080/login)
.post(function(req, res) {
    console.log('processing');
    res.send('processing the login form!');
});

app.listen(port,()=> {
    console.log(`connect at port ${port}`);
});