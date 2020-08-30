import { ModelTest } from '../models/ModelTest';

test('Name should be Vinicius', () => {
  const test = new ModelTest();
  test.name = 'Vinicius';
  test.test = true;

  expect(test.name).toEqual('Vinicius');
});
