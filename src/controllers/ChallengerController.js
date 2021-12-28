"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Challenger_1 = __importDefault(require("../model/Challenger"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
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
    const { name, day, year } = req.body;
    const challenger = new Challenger_1.default({ name, day, year });
    if (validateItems(name, day, year) && challenger) {
        try {
            const result = await challenger.save();
            res.json({ msg: 'Sucesso ao criar o Challenger!', data: result });
        }
        catch (err) {
            res.json({ msg: 'Erro ao criar o Challenger', data: err });
        }
    }
    else {
        res.json({ msg: 'Itens inválidos, verifique os campos enviados!', data: null });
    }
});
router.get('/', async (req, res) => {
    const { year } = req.query;
    try {
        let result = await Challenger_1.default.find(year ? { year } : {}).exec();
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
    }
    catch (err) {
        res.json({ msg: 'Erro ao buscar Challengers!', data: err });
    }
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
});
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
});
router.put('/:id', async (req, res) => {
    const { name, day, year } = req.body;
    const id = req.params.id;
});
router.delete('/deadend/on', async (req, res) => {
});
exports.default = router;
