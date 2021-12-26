import express from 'express';

import './database/connection';

const app = express();


const port = process.env.PORT || 4040;
app.listen(port, () => console.log('listening server on port ' + port));