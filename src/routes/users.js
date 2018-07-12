import Router from 'koa-router';
import Compose from 'koa-compose';
import Boom from 'boom';

import * as Controller from '../controllers/users';

const router = new Router({
	prefix: '/user'
})

router.get('/', Controller.get);
router.post('/', Controller.post);
router.put('/', Controller.put);
router.delete('/', Controller.remove);

const routes = router.routes();

const allowedMethods = router.allowedMethods({
	throw: true,
	notImplemented: () => new Boom.notImplemented("method is not written yet!"),
	methodNotAllowed: () => new Boom.methodNotAllowed("that method iss not allowd")
});

export default () => Compose([
	routes,
	allowedMethods,
])