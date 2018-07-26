import { Context } from 'koa';
import db from '../db/models'
import UserI from '../types/user';

const { User } = db

async function getUsers() {
	try {
		const users = await User.findAll();
		return users;
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

export const get = async (ctx: Context) => {
	ctx.body = { users: await getUsers() };
};

async function getUserById(id: string) {
	try {
		const users = await User.findById(id);
		return users;
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

export const getById = async (ctx: Context) => {
	const { id } = ctx.params;
	ctx.body = { users: await getUserById(id) };
};

async function insertUser({ name, email, phoneNumber, address }: UserI) {

	try {
		const res = await User.create({
			name, email, phoneNumber, address
		})
		return 'User successfully inserted';
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

export const post = async (ctx: Context) => {
	const { name, email, phoneNumber, address } = ctx.request.body;
	ctx.body = { message: await insertUser({ name, email, phoneNumber, address }) };
};

async function updateUser(id: string, name: string, email: string, phoneNumber: string, address: string) {
	try {
		const [res] = await User.update({
			name: name,
			email: email,
			phoneNumber: phoneNumber,
			address: address
		}, {
			where: {
				id: id
			}
		})
		if (res === 0) {
			return 'No record updated';
		}
		return 'User successfully updated';
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

export const put = async (ctx: Context) => {
	const { id, name, email, phoneNumber, address } = ctx.request.body;
	ctx.body = { message: await updateUser(id, name, email, phoneNumber, address) };
};

async function removeUser(id: string) {
	try {
		const res = await User.destroy({
			where: {
				id: id
			}
		});
		if (res === 0) {
			return `No user found with id ${id}`
		}
		console.log(res);
		return 'User successfully removed';
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}
export const remove = async (ctx: Context) => {
	const { id } = ctx.request.body;
	ctx.body = { message: await removeUser(id) };
};