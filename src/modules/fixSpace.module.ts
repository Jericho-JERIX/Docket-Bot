export function fixSpace(text: any, n: number, space = " ") {
	let res = String(text);
	while (res.length < n) {
		res = space + res;
	}
	return res;
}
