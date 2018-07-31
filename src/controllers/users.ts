import { Context } from 'koa';
import { getUsers, getUserById, insertUser, updateUser, removeUser } from '../repos/users'

export const get = async (ctx: Context) => {
	ctx.body = { users: await getUsers() };
};

export const getById = async (ctx: Context) => {
	const { id } = ctx.params;
	ctx.body = { users: await getUserById(id) };
};

export const post = async (ctx: Context) => {
	const { name, email, phoneNumber, address } = ctx.request.body;
	ctx.body = { message: await insertUser({ name, email, phoneNumber, address }) };
};

export const put = async (ctx: Context) => {
	const { id, name, email, phoneNumber, address } = ctx.request.body;
	ctx.body = { message: await updateUser(id, name, email, phoneNumber, address) };
};

export const remove = async (ctx: Context) => {
	const { id } = ctx.request.body;
	ctx.body = { message: await removeUser(id) };
};