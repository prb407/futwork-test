import { Request, Response, NextFunction } from 'express';
import CSVToJSON from 'csvtojson';

export class ParseDataController {
	constructor() {}
	parseData = async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!req.file || !req.file.buffer) {
				return res.status(400).json({
					message: 'File not found',
				});
			}
			let csvBuffer = req.file.buffer.toString('ascii');
			const csvJson = await CSVToJSON().fromString(csvBuffer);
			const processed = [];
			const unProcessed = [];
			csvJson.forEach((csvData) => {
				const selfIndex = processed.find(
					(processedData) => processedData.mobile === csvData.mobile,
				);
				if (!selfIndex) processed.push(csvData);
				else unProcessed.push(csvData);
			});
			res.json({
				processed,
				unProcessed,
			});
		} catch (error) {
			next(error);
		}
	};
}
