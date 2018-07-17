import { Context } from 'koa';
import pool from '../config/db';

interface User {
	id?: string,
	name: string,
	email: string,
	phone_number: string,
	address: string
}

async function getUsers() {
	try {
		const client = await pool.connect();
		const res = await client.query('SELECT id, name, email FROM user_info');
		client.release();
		console.log(res);
		
		return res.rows;
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
		const client = await pool.connect();
		const res = await client.query('SELECT * FROM user_info WHERE id=($1)', [id]);
		client.release();
		console.log(res);
		
		return res.rows;
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

export const getById = async (ctx: Context) => {	
	const { id } = ctx.params;
	ctx.body = { users: await getUserById(id) };
};

async function insertUser({name, email, phone_number, address} : User) {
	try {
		const client = await pool.connect();
		const res = await client.query('INSERT INTO user_info (name, email, phone_number, address) VALUES($1, $2, $3, $4)', [name, email, phone_number, address]);
		client.release();
		return 'User successfully inserted';
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

export const post = async (ctx: Context) => {
	const { name, email, phone_number, address } = ctx.request.body;
	ctx.body = { message: await insertUser({name, email, phone_number, address}) };
};

async function updateUser(id: string, userName: string) {
	try {
		const client = await pool.connect();
		const res = await client.query('UPDATE user_info SET name=($1) WHERE id=($2)', [userName, id]);
		client.release();
		if (res.rowCount === 0) {
			return 'No record updated';
		}
		return 'User successfully updated';
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

export const put = async (ctx: Context) => {
	const { id, name } = ctx.request.body;
	ctx.body = { message: await updateUser(id, name) };
};

async function removeUser(id: string) {
	try {
		const client = await pool.connect();
		const res = await client.query('DELETE FROM user_info WHERE id=($1)', [id]);
		client.release();
		console.log(res);

		if (res.rowCount === 0) {
			return 'No record removed';
		}
		return 'User successfully removed';
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}
export const remove = async (ctx: Context) => {
	const {id} = ctx.request.body;
	ctx.body = { message: await removeUser(id) };
};