import { ControllerTest } from '../controllers/ControllerTest';

export class Routes {
  public routes (app: any): void {
    const controller = new ControllerTest();
    app.route('/')
      .get(controller.test);
  }
}
