import express from 'express';
import bodyParser from 'body-parser';
import registrationRouter from './src/routes/registration.route.js';
import { establishConn } from './src/services/connection.service.js';
import { connection_config } from './src/configs/mongodb.config.js';
import  { requestTime }  from "./src/middlewares/reqTime.middleware.js";

const app = express();
const { app: { port } } = connection_config;
const port_default = process.env.PORT || port;
//Establish connection 
establishConn();

//We do not need this express.json() parser for GET AND DELETE request,
//we need to use it to get data from POST/PUt request to get in json format
//THis is call middleware in express
app.use(express.json());
//OR use below bodyparser package methods
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
//app.use(bodyParser.json())

// app.use(json());
// app.use(
// 	urlencoded({
// 		extended: true,
// 	})
// );

/*Use global middle ware here*/
app.use(requestTime);

app.get('/', (req, res) => {
	res.json({'message': 'ok'});
})

app.use('/user-registration', registrationRouter);

app.get('/login', authorizeUsersAccess, (req, res) => {
	res.send('login page')
})

function authorizeUsersAccess(req, res, next) {
	console.log(req);
	if (req.query.admin === 'true') {
		next()
	} else {
	res.send('ERROR: You must be an admin')
	}
}

/* Error handler middleware */
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	console.error(err.message, err.stack);
	res.status(statusCode).json({'message': err.message});

	return;
});

app.listen(port_default, '0.0.0.0', () => {
	console.log(`Backend app listening at http://localhost:${port_default}`)
});
