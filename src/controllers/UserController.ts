import { Request, Response } from 'express';
import { User } from 'src/entity/User';
import Util from '../util/util';

export class UserController {
	public async signUp(req: Request, res: Response): Promise<void> {

		console.log(__dirname);
		console.log('req.body');
		try {
			const userData = req.body;

			Util.existOrError(userData, 'No data sent');
			Util.existOrError(userData.name, 'Name is required');

			const user = new User();

			user.name = userData.name;
			user.gamerTag = userData.gamerTag;
			await user.save();

			res.status(200).send('User saved');
		} catch (error) {
			res.status(400).send(error.message);
		}
	}
}
