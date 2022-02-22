/**
 * @author Pritesh Bhanderi
 */

import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import IndexRouter from './router';
const server = express();

/**
 * added body-parser to set body if you are sending json
 */
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(IndexRouter.router);

server.use((err: any, req: Request, res: Response, next: NextFunction) => {
	let message = err.message;
	if (err.message.indexOf('connect ECONNREFUSED') > -1) {
		// mysql connection error
		message = 'Server error';
	}
	res.status(err.statusCode || 500).json({
		status: 'error',
		message: message,
	});
});
export default server;
