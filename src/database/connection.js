"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function connect() {
    try {
        await mongoose_1.default.connect('mongodb+srv://bluejaygm:shimoko123@inktoberapi.2xlkn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        console.log('Conectado com sucesso!');
    }
    catch (err) {
        console.log('Erro ao se conectar: ', err);
    }
}
connect();
