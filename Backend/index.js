import express from 'express';
import path  from 'path';
import bodyParser from 'body-parser';
import registrationRouter from './src/routes/registration.route.js';
import usersRouter from './src/routes/users.router.js';
import { establishConn } from './src/services/connection.service.js';
import { connection_config } from './src/configs/mongodb.config.js';
import  { requestTime }  from "./src/middlewares/reqTime.middleware.js";
import  { errorHandler }  from "./src/middlewares/errorHandler.middleware.js";
//import view engine in node project 
import hbs from "hbs";
//to defined __dirname in ES module scope
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const { app: { port } } = connection_config;
const port_default = process.env.PORT || port;
//Establish connection 
establishConn();

//We do not need this express.json() parser for GET AND DELETE request,
//we need to use it to get data from POST/PUt request to get in json format
//THis is call middleware in express
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//OR use below bodyparser package methods
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
//app.use(bodyParser.json())

//We want to run website on pure Node Js for this we have to use hbs template engine and static paths
const static_path = path.join(__dirname, "/public");  //find index.html inside public if not found then run template/index.hbs
const template_path = path.join(__dirname, "views/templates");
const partial_path = path.join(__dirname, "views/partials");  
//If we are using HTML in public folder then set view engine html else hbs
app.use("/public", express.static(static_path));
/*using new template engine hbs*/
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partial_path);

app.get('/', (req, res) => {
	res.render("index");
});

app.get('/register', (req, res) => {
	res.render("index");
});

/*Use global middle ware here*/
app.use(requestTime);
/* Error handler middleware */
app.use(errorHandler);

app.get('/login', authorizeUsersAccess, async(req, res) => {
	try{
		res.status(201).send("Login Page")
	}
	catch(er){
		console.log("error is : ", er);
		res.status(400).send({"error":"something went wrong!"});
	};
})
//Create middleware authentication and pass it to login 
function authorizeUsersAccess(req, res, next) {
	console.log(req);
	if (req.query.admin = 'true') {
		next()
	} else {
	res.send('ERROR: You must be an admin')
	}
}

app.use('/user-registration', registrationRouter);

app.use('/users', usersRouter);

//Run app at port localhost on server  
app.listen(port_default, '0.0.0.0', () => {
	console.log(`Backend app listening at http://localhost:${port_default}`)
});
