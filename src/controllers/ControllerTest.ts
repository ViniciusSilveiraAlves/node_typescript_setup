import { ModelTest } from '@models/ModelTest';

export class ControllerTest {
  test (): ModelTest {
    const test = new ModelTest();
    return test;
  }
}
