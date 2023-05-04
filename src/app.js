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
import workerTaskRoutes from './routes/workerTaskRoutes';
import workerManualfrequencyRoutes from './routes/workerManualfrequencyRoutes';

import manualRoutes from './routes/manualRoutes';

import loginRequired from './middlewares/loginRequired';

import scheduledTasks from './scheduledTasks';

// TAREFAS AGENDADAS COM PROBLEMA, VERIFICAR PARA DEPOIS ATIVAR
// scheduledTasks();

const whiteList = [
  'http://localhost:3000',
  'http://localhost',
  'http://10.1.156.199:3000', // PC MYKAEL DIMAN
  'http://192.168.0.25:3000', // PC MYKAEL CASA
  'https://192.168.0.25', // PC MYKAEL CASA
  'https://192.168.0.25:3002', // PC MYKAEL CASA
  'https://192.168.0.25:443', // PC MYKAEL CASA
  'https://10.1.156.199',
  'https://10.1.156.199:3002',
  'https://10.1.156.199:443',
  'http://10.1.158.162:3000',
  'https://10.1.158.162',
  'https://10.1.158.162:3002',
  'https://10.1.158.162:443',
  'https://sisman.infra.ufrn.br',
  'https://sisman.infra.ufrn.br:443',
  'https://sisman.infra.ufrn.br:3000',
  'https://sisman.infra.ufrn.br:3002',
  'https://192.168.1.13',
  'http://192.168.1.13:3000',
  'http://192.168.1.13:3001',
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
    this.app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })); // tive q usar devido as fotos do boxlight
    // this.app.use(helmet());
    // this.app.use(delay(2000));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
    this.app.use(
      '/uploads/',
      express.static(resolve(__dirname, '..', 'uploads'))
    );
    // this.app.use('/uploads/', express.static(resolve(__dirname, '..', 'uploads', 'workers', 'images')));
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
    this.app.use('/workerstasks/', workerTaskRoutes);
    this.app.use('/workersmanualfrequencies/', workerManualfrequencyRoutes);
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
