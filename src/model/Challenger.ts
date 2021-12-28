import mongoose from 'mongoose';

const challengerSchema = new mongoose.Schema({
	name: String,
	day: Number,
	year: Number
});

const Challenger = mongoose.model('challengers', challengerSchema);

export default Challenger;