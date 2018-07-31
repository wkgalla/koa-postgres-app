import db from '../db/models'
import UserI from '../types/user';

const { User } = db

export async function getUsers() {
try {
	const users = await User.findAll();
		return users;
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

export async function getUserById(id: string) {
	try {
		const users = await User.findById(id);
		return users;
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}

export async function insertUser({ name, email, phoneNumber, address }: UserI) {

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

export async function updateUser(id: string, name: string, email: string, phoneNumber: string, address: string) {
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

export async function removeUser(id: string) {
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