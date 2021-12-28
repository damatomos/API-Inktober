import mongoose from 'mongoose';

async function connect() {
	try {
		await mongoose.connect('mongodb+srv://bluejaygm:shimoko123@inktoberapi.2xlkn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
		console.log('Conectado com sucesso!');
	} catch (err) {
		console.log('Erro ao se conectar: ', err);
	}
}

connect();