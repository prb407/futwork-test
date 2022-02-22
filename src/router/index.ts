import { Router } from 'express';
import { ParseDataController } from '../controller';
import multer from 'multer';

class IndexRouter {
	private _router: Router = Router();
	private parseDataController: ParseDataController;
	constructor() {
		this.parseDataController = new ParseDataController();
		this._initRouting();
	}
	_initRouting() {
		this._router.get('/parse', multer({}).single('data-file'), this.parseDataController.parseData);
	}
	get router() {
		return this._router;
	}
}

export default new IndexRouter();
