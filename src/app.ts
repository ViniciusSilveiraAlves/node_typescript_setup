import express from 'express';
import bodyParser from 'body-parser';
import { Routes } from './routes/index';
import dotenv from 'dotenv';
class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();

    constructor () {
      this.app = express();
      console.log('middlewares added');
      this.config();
      console.log('routes added');
      this.routePrv.routes(this.app);
      this.dbSetup();
    }

    private config (): void {
      // support application/json type post data
      this.app.use(bodyParser.json());
      // support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));

      dotenv.config();

      console.log('process.env.NODE_ENV)');
      console.log(process.env.NODE_ENV);

      let path;
      switch (process.env.NODE_ENV) {
        case 'test':
          path = `${__dirname}/.env.test`;
          break;
        case 'production':
          path = `${__dirname}/.env.prod`;
          break;
        default:
          path = `${__dirname}/.env.dev`;
      }
      dotenv.config({ path: path });
    }

    private dbSetup (): void{
      console.log('No database configuration detected');
    }
}

export default new App().app;
