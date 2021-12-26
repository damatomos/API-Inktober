import { getFirestore } from 'firebase-admin/firestore';
import Challenger from '../model/Challenger';

const database = getFirestore();

export default class ChallengerProvider {

	collection: string = 'challenger';

	async findAll() { // Pega todos os documentos da collection
		try {
			const snapshot = await database.collection(this.collection).orderBy('year', 'desc').get();
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

	async findAllByYear(year: number) {
		try {
			const snapshot = await database.collection(this.collection).where('year', '==', year).get();
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

	async findAllByDay(day: number) {
		try {
			const snapshot = await database.collection(this.collection).where('day', '==', day).get();
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
				const challenger = await database.collection(this.collection).doc(id).get();
				return challenger.data();
			} catch(err) {
				console.log('Erro ao pegar challenger: ', err);
			}
		}
	}

	async create(challenger: Challenger) { // Cria um novo documento na colleciton
		if (challenger) {
			try {
				const challengers = await this.findAll();
				challengers.forEach( (challengerA) => {
					if (
						challengerA.day == challenger.day &&
						challengerA.year == challenger.year
					) {
						throw new Error('Já existe um challenger desse período.');
					}
				});
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

	async deadend() {
		try {
			const challengers = await this.findAll();
			challengers.forEach(async (challenger) => {
				await this.delete(challenger.id);
			});
			console.log('DeadEnd aplicado. Todos os itens foram deletados!');
			return true;
		} catch (err) {
			console.log('Erro ao aplicar o DeadEnd: ', err);
		}
		return false;
	}

}