import pool from '../config/db';

async function getCars() {
	try {
		const client = await pool.connect();
		const res = await client.query('SELECT * FROM cars_info');
		client.release(true);
		return res.rows;
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

export const get = async (ctx) => {
	ctx.body = { cars: await getCars() };
};

async function insertCar(carName) {
	try {
		const client = await pool.connect();
		const res = await client.query('INSERT INTO cars_info (name) VALUES($1)', [carName]);
		client.release(true);
		return 'Car successfully inserted';
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

export const post = async (ctx) => {
	const { name } = ctx.request.body;
	ctx.body = { message: await insertCar(name) };
};

async function updateCar(id, carName) {
	try {
		const client = await pool.connect();
		const res = await client.query('UPDATE cars_info SET name=($1) WHERE id=($2)', [carName, id]);
		client.release(true);
		if (res.rowCount === 0) {
			return 'No record updated';
		}
		return 'Car successfully updated';
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

export const put = async (ctx) => {
	const { id, name } = ctx.request.body;
	ctx.body = { message: await updateCar(id, name) };
};

async function removeCar(id) {
	try {
		const client = await pool.connect();
		const res = await client.query('DELETE FROM cars_info WHERE id=($1)', [id]);
		client.release(true);
		console.log(res);

		if (res.rowCount === 0) {
			return 'No record removed';
		}
		return 'Car successfully removed';
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

export const remove = async (ctx) => {
	const { id } = ctx.request.body;
	ctx.body = { message: await removeCar(id) };
};