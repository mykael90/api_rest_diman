import dotenv from 'dotenv';
import { resolve } from 'path';

import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

import './database';

import express from 'express';
import homeRoutes from './routes/homeRoutes';
import userRoutes, { userOpenedRouter as userOpenedRoutes } from './routes/userRoutes';
import alunoRoutes from './routes/alunoRoutes';
import tokenRoutes from './routes/tokenRoutes';
import fotoRoutes from './routes/fotoRoutes';
import loginRequired from './middlewares/loginRequired';

const whiteList = [
  'https://react.mme.eng.br',
  'http://localhost:3000',
  'https://www.wikipedia.org', // teste
];

const corsOptions = {
  origin(origin, callback) {
    if ((whiteList.indexOf(origin)) !== -1 || !origin) {
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
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    // Rotas abertas
    this.app.use('/', homeRoutes);
    this.app.use('/tokens/', tokenRoutes);
    // this.app.use('/users/', userOpenedRoutes);

    // Middleware de autenticação
    // this.app.use(loginRequired); //abrir por enquanto

    // Rotas fechadas
    this.app.use('/users/', userOpenedRoutes); // fechar por enquanto
    this.app.use('/users/', userRoutes);
    this.app.use('/alunos/', alunoRoutes);
    this.app.use('/fotos/', fotoRoutes);
  }
}

export default new App().app;
