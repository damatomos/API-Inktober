import { getFirestore } from 'firebase-admin/firestore';
import Challenger from '../model/Challenger';
import ChallengerProvider from '../providers/ChallengerProvider';
import { v4 as uuidv4 } from 'uuid';

import express from 'express';
const router = express.Router();

const provider = new ChallengerProvider();

router.post('/', async (req, res) => {
	const {name, day, year} = req.body;
	const challenger = new Challenger(uuidv4(), name, day, year);

	if ( challenger.validate() ) {
		try {
			const result = await provider.create(challenger);
			if ( result ) {
				res.statusCode = 200;
				res.json('Challenger criado com sucesso!');
			} else {
				res.statusCode = 403;
				res.json('Erro ao criar challenger');
			}
		} catch(err) {
			res.statusCode = 400;
			res.json('Erro ao criar challenger');
		}
	}

});

router.get('/', async (req, res) => {

	const { year, day } = req.query;

	try {
		let challengers = [];
		let query: any = '';
		if (day) query = 'day';
		if (year) query = 'year';

		switch (query) {
			case 'year':
				challengers = await provider.findAllByYear(Number(year));
				break;
			case 'day':
				challengers = await provider.findAllByDay(Number(day));
				break;
			default:
				challengers = await provider.findAll();
		}

		res.statusCode = 200;
		res.json(challengers);
	} catch(err) {
		res.statusCode = 400;
		res.json('Erro ao buscar challengers');
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const challenger = await provider.find(id);
		res.statusCode = 200;
		res.json(challenger);
	} catch (err) {
		res.statusCode = 400;
		res.json('Erro ao pegar challenger!');
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		await provider.delete(id);
		res.statusCode = 200;
		res.json('Challenger deletado com sucesso!');
	} catch(err) {
		res.statusCode = 500;
		res.json('Erro ao deletar o Challenger');
	}
});

router.put('/:id', async (req, res) => {
	const {name, day, year} = req.body;
	const id = req.params.id;
	try {
		const challenger = new Challenger(id, name, day, year);
		await provider.update(challenger);
		res.statusCode = 200;
		res.json('Sucesso ao atualizar o challenger!');
	} catch (err) {
		res.statusCode = 400;
		res.json('Erro ao atualiar o challenger');
	}
});

router.delete('/deadend/on', async (req, res) => {
	try {
		const result = await provider.deadend();
		if (result) {
			res.statusCode = 200;
			res.json('DeadEnd iniciado!');
		}
		res.statusCode = 400;
		res.json('Erro ao aplicar o deadend');
	} catch (err) {
		res.statusCode = 400;
		res.json('Erro ao aplicar o deadend');
	}
});

export default router;