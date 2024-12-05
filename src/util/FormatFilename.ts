export function formatFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9]/g, "-");
}