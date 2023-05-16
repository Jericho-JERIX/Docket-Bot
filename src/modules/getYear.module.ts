export function getYear(d: number, m: number) {
	const currentYear = Number(String(new Date()).split(" ")[3]);
	const duets = new Date(currentYear, m - 1, d, 23, 59, 59).getTime();
	const nowts = Date.now();
	if (duets <= nowts) {
		return currentYear + 1;
	}
	return currentYear;
}
