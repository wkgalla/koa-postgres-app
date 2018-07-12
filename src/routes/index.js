import Compose from 'koa-compose';
import Cars from './cars';
import Users from './users';

export default () => Compose([
	Cars(),
	Users(),
]);