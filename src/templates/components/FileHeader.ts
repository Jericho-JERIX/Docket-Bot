export function FileHeader(filename: string, count: string | number): string {
	return `\`\`\`📂 File: ${filename} (${count})\`\`\``;
}
