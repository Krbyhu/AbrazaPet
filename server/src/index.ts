import dotenv from 'dotenv';
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import userRoutes from './routes/user.routes';
import petRoutes from './routes/pet.routes';
import chatRoutes from './routes/chats.routes';

//Inicialization
const app: Application = express();
dotenv.config();

//Settings
app.set('port', process.env.PORT || 3000);


// //Mddlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    exposedHeaders: ['auth-token'],
  }));

// //Routes
app.use('/api/auth', userRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/chats', chatRoutes);


//Starting the server
app.listen(app.get('port'), () => {
    console.log('\nServer is running at http://localhost:' +
        app.get('port') + '\n'
    );
});