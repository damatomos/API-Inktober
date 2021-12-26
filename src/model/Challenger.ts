
class Challenger {
	id: string;
	name: string;
	day: number;
	year: number;

	constructor(id: string, name: string, day: number, year: number) {
		this.id = id;
		this.name = name;
		this.day = day;
		this.year = year;
	}

	validate() {
		if (
			this.id && this.id.trim() &&
			this.name && this.name.trim() &&
			this.day && this.day > 0 && this.day < 32 &&
			this.year && this.year > 0
		) {
			return true;
		}
		return false;
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			day: this.day,
			year: this.year
		}
	}
}

export default Challenger;