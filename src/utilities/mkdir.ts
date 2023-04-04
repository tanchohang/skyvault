import fs from 'fs';

export function makeDirectory(path: string) {
  fs.mkdirSync(path, { recursive: true });
}
