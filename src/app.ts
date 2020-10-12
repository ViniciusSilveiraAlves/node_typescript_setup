import express from 'express';
import dotEnv from 'dotenv';
import { Routes } from './routes/index';
import { createConnection } from 'typeorm';
import passport from 'passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

import path from 'path';
import { User } from './entity/User';

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    console.log('middlewares added');
    this.routePrv.routes(this.app);
    console.log('routes added');
    this.dbSetup();
  }

  private config(): void {
    let pathTemp: string;
    switch (process.env.NODE_ENV) {
      case 'test':
        pathTemp = `${__dirname}/.env.test`;
        break;
      case 'production':
        pathTemp = `${__dirname}/.env.prod`;
        break;
      default:
        pathTemp = `${__dirname}/.env.dev`;
    }

    const result = dotEnv.config({ path: pathTemp });

    if (result.error) {
      throw result.error;
    }
    // support application/json type post data
    this.app.use(express.json());

    // support application/x-www-form-urlencoded post data
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(passport.initialize());

    const opts: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    };

    const authStrategy = new Strategy(opts, async (payload, done) => {
      try {
        const user = await User.findOne(payload.id, { select: ['id', 'name', 'gamerTag', 'email', 'avatar'] });
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        console.log(error);
      }
    });

    passport.use(authStrategy);

    this.app.use('/static', express.static(path.join(__dirname, 'static')));
  }

  private dbSetup(): void {
    createConnection().then(() => {
      console.log('database connected');
    }).catch(error => {
      throw error;
    });
  }
}

export default new App().app;
