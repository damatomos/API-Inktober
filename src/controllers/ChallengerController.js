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
    const result = await Challenger_1.default.where({ day, year }).findOne().exec();
    if (result && result._id != null) {
        res.statusCode = 403;
        res.json({ msg: 'Já existe um Challenger nesse período.', data: result });
        '';
    }
    if (validateItems(name, day, year) && challenger) {
        try {
            const result = await challenger.save();
            res.statusCode = 200;
            res.json({ msg: 'Sucesso ao criar o Challenger!', data: result });
        }
        catch (err) {
            res.statusCode = 400;
            res.json({ msg: 'Erro ao criar o Challenger', data: err });
        }
    }
    else {
        res.statusCode = 400;
        res.json({ msg: 'Itens inválidos, verifique os campos enviados!', data: null });
    }
});
router.get('/', async (req, res) => {
    const { year } = req.query;
    try {
        let result = await Challenger_1.default.find(year ? { year } : {}).sort('year').sort('day').exec();
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
    try {
        if (id) {
            const result = await Challenger_1.default.findById(id);
            if (result) {
                res.statusCode = 200;
                res.json({ msg: 'Sucesso ao encontrar o Challenger!', data: result });
            }
            else {
                res.statusCode = 400;
                res.json({ msg: 'Erro ao buscar Challengers!', data: null });
            }
        }
        else {
            res.statusCode = 400;
            res.json({ msg: 'Identificado Inválido!', data: null });
        }
    }
    catch (err) {
        res.statusCode = 400;
        res.json({ msg: 'Erro ao buscar Challengers!', data: err });
    }
});
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        if (id) {
            const result = await Challenger_1.default.findOneAndDelete({ _id: id }).exec();
            if (result) {
                res.statusCode = 200;
                res.json({ msg: 'Sucesso ao deletar o Challenger!', data: result });
            }
            else {
                res.statusCode = 400;
                res.json({ msg: 'Erro ao deletar Challenger. Challenger não encontrado!', data: result });
            }
        }
        else {
            res.statusCode = 400;
            res.json({ msg: 'Identificado Inválido!', data: null });
        }
    }
    catch (err) {
        res.statusCode = 400;
        res.json({ msg: 'Erro ao deletar Challenger!', data: err });
    }
});
router.put('/:id', async (req, res) => {
    const { name, day, year } = req.body;
    const id = req.params.id;
    const challenger = await Challenger_1.default.findById(id);
    if (validateItems(name, day, year) && id && challenger) {
        try {
            const result = await Challenger_1.default.where({ _id: id }).updateOne({ name, day, year });
            res.statusCode = 200;
            res.json({ msg: 'Sucesso ao editar o Challenger!', data: result });
        }
        catch (err) {
            res.statusCode = 400;
            res.json({ msg: 'Erro ao editar o Challenger', data: err });
        }
    }
    else {
        res.statusCode = 400;
        res.json({ msg: 'Itens inválidos, verifique os campos enviados!', data: null });
    }
});
router.delete('/deadend/on', async (req, res) => {
    try {
        const result = await Challenger_1.default.deleteMany({});
        res.statusCode = 200;
        res.json({ msg: 'DeadEnd iniciado!', data: result });
    }
    catch (err) {
        res.statusCode = 400;
        res.json({ msg: 'Erro ao iniciar DeadEnd', data: err });
    }
});
exports.default = router;
