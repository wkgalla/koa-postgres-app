import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import routeMiddleWare from './routes';

const app = new Koa();

// app.use(loggerMiddleware);
app.use(bodyParser());
app.use(routeMiddleWare());

// app.use(async ctx => {
//   ctx.body = 'Hell World';
// });

app.listen(4000);