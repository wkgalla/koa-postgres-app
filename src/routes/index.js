import Compose from 'koa-compose';
import Users from './users';

export default () => Compose([
	Users(),
]);