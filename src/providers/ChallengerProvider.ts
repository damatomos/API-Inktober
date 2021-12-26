import { getFirestore } from 'firebase-admin/firestore';
import Challenger from '../model/Challenger';
import { v4 as uuidv4 } from 'uuid';

const database = getFirestore();

export default class ChallengerProvider {

	collection: string = 'challenger';

	async findAll() { // Pega todos os documentos da collection
		try {
			const snapshot = await database.collection(this.collection).get();
			const challengers = [];
			snapshot.forEach((doc) => {
				challengers.push(doc.data());
			});
			return challengers;
		} catch(err) {
			console.log('Erro ao pegar challengers: ', err);
		}
		return [];
	}

	async find(id: string) { // Pega apenas um documento da collection
		if (id) {
			try {
				return await database.collection(this.collection).doc(id).get();
			} catch(err) {
				console.log('Erro ao pegar challenger: ', err);
			}
		}
	}

	async create(challenger: Challenger) { // Cria um novo documento na colleciton
		if (challenger) {
			try {
				await database.collection(this.collection).doc(challenger.id).set(challenger.toJSON());
				console.log('Challenger criado com sucesso!');
				return true;
			} catch(err) {
				console.log('Erro ao criar challenger: ', err);
			}
		}
		return false;
	}

	async update(challenger: Challenger) { // Atualiza um documento na collection
		if ( challenger ) {
			try {
				await database.collection(this.collection).doc(challenger.id).update(challenger.toJSON());
				console.log('Challenger atualizado com sucesso!');
				return true;
			} catch(err) {
				console.log('Erro ao atualizar challenger: ', err);
			}
		}
		return false;
	}

	async delete(id: string) { // Deleta um documento da collection
		if (id) {
			try {
				await database.collection(this.collection).doc(id).delete();
				console.log('Challenger deletado com sucesso!');
				return true;
			} catch(err) {
				console.log('Erro ao deletar challenger: ', err);
			}
		}
		return false;
	}

}