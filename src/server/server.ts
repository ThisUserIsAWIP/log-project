import * as express from 'express';
import * as passport from 'passport';
import * as PassportLocal from 'passport-local'
import * as path from 'path';
import globalRouter from './routes';
import { clientHandler, CLIENT_ROUTES } from './middleware/client-handler';
import { globalErrors, notFoundHandler } from './middleware/error-handlers';
const app = express();

app.use(express.json());

import { configurePassport } from './middleware/passport-strategies.mw';

configurePassport(app);
app.use(express.static('public'));
app.use(globalRouter);
app.get(CLIENT_ROUTES, clientHandler);
app.use(notFoundHandler);
app.use(globalErrors);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
