import Challenger from '../model/Challenger';

import express from 'express';
const router = express.Router();

function validateItems(...items) {
	let success = items.length;
	items.forEach(item => {
		if (item) {
			success--;
		}
	});
	return success == 0;
}

router.post('/', async (req, res) => {
	const {name, day, year} = req.body;
	const challenger = new Challenger({name, day, year});
	if ( validateItems(name, day, year) && challenger ) {
		try {
			const result = await challenger.save();
			res.json({msg: 'Sucesso ao criar o Challenger!', data: result});
		} catch (err) {
			res.json({msg: 'Erro ao criar o Challenger', data: err});
		}
	} else {
		res.json({msg: 'Itens inválidos, verifique os campos enviados!', data: null});
	}

});

router.get('/', async (req, res) => {

	const { year } = req.query;

	try {
		let result = await Challenger.find(year ? { year } : {}).exec();
		let years = [];
		result.forEach((challenger) => {
			if (!years.includes(challenger.year)) {
				years.push(challenger.year);
			}
		});
		res.json({
			msg: 'Challengers recuperados com sucesso!',
			data: {
				challengers: result,
				years
			}
		});
	} catch (err) {
		res.json({msg: 'Erro ao buscar Challengers!', data: err});
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
})

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
});

router.put('/:id', async (req, res) => {
	const {name, day, year} = req.body;
	const id = req.params.id;
});

router.delete('/deadend/on', async (req, res) => {
});

export default router;