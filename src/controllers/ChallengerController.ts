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
			await provider.create(challenger);
			res.statusCode = 200;
			res.json('Challenger criado com sucesso!');
		} catch(err) {
			res.statusCode = 400;
			res.json('Erro ao crair challenger');
		}
	}

});

router.get('/', async (req, res) => {
	try {
		const challengers = await provider.findAll();
		res.statusCode = 200;
		res.json(challengers);
	} catch(err) {
		res.statusCode = 400;
		res.json('Erro ao buscar challengers');
	}
});

export default router;