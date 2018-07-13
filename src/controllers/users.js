import pool from '../config/db';

async function getUsers() {
	try {
		const client = await pool.connect();
		const res = await client.query('SELECT id, name, email FROM user_info');
		client.release(true);
		console.log(res);
		
		return res.rows;
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

export const get = async (ctx) => {
	ctx.body = { users: await getUsers() };
};

async function getUserById(id) {
	try {
		const client = await pool.connect();
		const res = await client.query('SELECT * FROM user_info WHERE id=($1)', [id]);
		client.release(true);
		console.log(res);
		
		return res.rows;
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

export const getById = async (ctx) => {	
	const { id } = ctx.params;
	ctx.body = { users: await getUserById(id) };
};

async function insertUser(name, email, phone_number, address) {
	try {
		const client = await pool.connect();
		const res = await client.query('INSERT INTO user_info (name, email, phone_number, address) VALUES($1, $2, $3, $4)', [name, email, phone_number, address]);
		client.release(true);
		return 'User successfully inserted';
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

export const post = async (ctx) => {
	const { name, email, phone_number, address } = ctx.request.body;
	ctx.body = { message: await insertUser(name, email, phone_number, address) };
};

async function updateUser(id, userName) {
	try {
		const client = await pool.connect();
		const res = await client.query('UPDATE user_info SET name=($1) WHERE id=($2)', [userName, id]);
		client.release(true);
		if (res.rowCount === 0) {
			return 'No record updated';
		}
		return 'User successfully updated';
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

export const put = async (ctx) => {
	const { id, name } = ctx.request.body;
	ctx.body = { message: await updateUser(id, name) };
};

async function removeUser(id) {
	try {
		const client = await pool.connect();
		const res = await client.query('DELETE FROM user_info WHERE id=($1)', [id]);
		client.release(true);
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

export const remove = async (ctx) => {
	const { id } = ctx.request.body;
	ctx.body = { message: await removeUser(id) };
};