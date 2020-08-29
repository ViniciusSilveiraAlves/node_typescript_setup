import { ModelTest } from '@models/ModelTest';

test('it should be ok', () => {
  const test = new ModelTest();
  test.name = 'Vinicius';
  test.test = true;

  expect(test.name).toEqual('Vinicius');
});
