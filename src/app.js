import dotenv from 'dotenv';
import { resolve } from 'path';
// import delay from 'express-delay';

import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

import './database';

import express from 'express';
import homeRoutes from './routes/homeRoutes';
import userRoutes, {
  userOpenedRouter as userOpenedRoutes,
} from './routes/userRoutes';
import alunoRoutes from './routes/alunoRoutes';
import tokenRoutes from './routes/tokenRoutes';
import fotoRoutes from './routes/fotoRoutes';
import materialRoutes from './routes/materialRoutes';
import unidadeRoutes from './routes/unidadeRoutes';
import propertyRoutes from './routes/propertyRoutes';
import providerRoutes from './routes/providerRoutes';
import workerRoutes from './routes/workerRoutes';
import manualRoutes from './routes/manualRoutes';

import loginRequired from './middlewares/loginRequired';

const whiteList = [
  'https://react.mme.eng.br',
  'http://localhost:3000',
  'https://www.wikipedia.org',
  'http://10.1.159.210:3000', // PC MYKAEL DIMAN OLD
  'http://10.1.156.199:3000', // PC MYKAEL DIMAN
  'http://192.168.0.25:3000', // PC MYKAEL CASA
  'http://10.1.158.116:3000', // PC Alexandre DIMAN
  'http://192.168.100.46:3000',
  'http://10.1.158.162:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    // this.app.use(delay(2000));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    // Rotas abertas

    this.app.use('/', homeRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/users/', userOpenedRoutes);

    // Middleware de autenticação
    this.app.use(loginRequired);

    // Rotas fechadas
    this.app.use('/workers/', workerRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/alunos/', alunoRoutes);
    this.app.use('/fotos/', fotoRoutes);
    this.app.use('/materials/', materialRoutes);
    this.app.use('/unidades/', unidadeRoutes);
    this.app.use('/properties/', propertyRoutes);
    this.app.use('/providers/', providerRoutes);
    this.app.use('/manualupdates/', manualRoutes);
  }
}

export default new App().app;
