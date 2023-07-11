import fs from 'fs';
export function makeDirectory(path) {
    fs.mkdirSync(path, { recursive: true });
}
//# sourceMappingURL=mkdir.js.map