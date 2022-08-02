import express from 'express';
import bodyParser from 'body-parser';
import registrationRouter from './src/routes/registration.route.js';
import { establishConn } from './src/services/connection.service.js';
import { connection_config } from './src/configs/mongodb.config.js';

const app = express();
const { app: { port } } = connection_config;
const port_default = process.env.PORT || port;
//Establish connection 
establishConn();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use(json());
// app.use(
// 	urlencoded({
// 		extended: true,
// 	})
// );

app.get('/', (req, res) => {
	res.json({'message': 'ok'});
})

app.use('/user-registration', registrationRouter);

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
