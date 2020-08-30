import {} from 'express';
import { ModelTest } from '../models/ModelTest';
export class ControllerTest {
  public test (req, res) {
    try {
      console.log('got test function');
      const test = new ModelTest();
      if (!req.body.name || req.body.name === '') {
        throw new Error('Name is required');
      }
      test.name = req.body.name;
      test.test = req.body.test;
      res.status(200).send(test);
    } catch (error) {
      console.log(error.message);
      res.status(400).send(error.message);
    }
  }
}
