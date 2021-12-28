import express from 'express';

import cors from 'cors';

import './database/connection';

import './controllers/ChallengerController';

import router from './controllers/ChallengerController';

const app = express();

// Config CORS
app.use(cors());

// Config Body Parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/challenger', router);


const port = process.env.PORT || 4040;
app.listen(port, () => console.log('listening server on port ' + port));