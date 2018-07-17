import * as Router from 'koa-router';
import * as Compose from 'koa-compose';
import * as Boom from 'boom';
import * as Controller from '../controllers/users';

const router = new Router({
	prefix: '/user'
})

router.get('/', Controller.get);
router.get('/:id', Controller.getById);
router.post('/', Controller.post);
router.put('/', Controller.put);
router.delete('/', Controller.remove);

const routes = router.routes();

const allowedMethods = router.allowedMethods({
	throw: true,
	notImplemented: () => Boom.notImplemented("method is not written yet!"),
	methodNotAllowed: () => Boom.methodNotAllowed("that method iss not allowd")
});

export default () => Compose([
	routes,
	allowedMethods,
])