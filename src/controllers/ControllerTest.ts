import { Request, Response } from 'express';
import { User } from 'src/entity/User';
import Util from '../util/util';

export class UserController {
  public async signUp(req: Request, res: Response) {
    console.log(__dirname);
    console.log('req.body');
    try {
      const userData = req.body;


      Util.existOrError(userData, 'No data sent');
      Util.existOrError(userData.name, 'Name is required');
      Util.existOrError(userData.gamerTag, 'Gamer Tag is required');
      Util.existOrError(userData.email, 'Email is required');
      Util.existOrError(userData.password, 'password is required');
      Util.existOrError(userData.verifyPass, 'Repeat password is required');
      Util.equalsOrError(userData.password, userData.verifyPass, 'Passwords are not equals');
      Util.isEmail(userData.email, 'Incorrect e-mail format');

      const user = new User();
      user.name = userData.name;
      user.gamerTag = userData.gamerTag;
      user.email = userData.email;
      user.avatar = `user/${userData.fileName}`;
      user.password = userData.password;
      await user.save();

      res.status(200).send('User saved');
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        error.message = 'E-mail/GamerTag is already in use';
      }
      res.status(400).send(error.message);
    }
  }
}
