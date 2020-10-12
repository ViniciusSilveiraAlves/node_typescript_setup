import { UserController } from '../controllers/UserController';

export class Routes {
  public routes (app: any): void {
    const userController = new UserController();
    app.route('/')
      .get(userController.signUp);
  }
}
