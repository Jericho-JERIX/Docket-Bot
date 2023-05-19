export function FileHeader(filename: string, count: string | number): string {
	return `\`\`\`📂 Collection: ${filename} (${count})\`\`\``;
}
