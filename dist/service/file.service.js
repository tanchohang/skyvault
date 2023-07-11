import { File } from '../model/file.model.js';
export async function isFile(uid, pid) {
    try {
        const file = await File.find({ user: uid, _id: pid });
        if (file) {
            return true;
        }
        return false;
    }
    catch (error) {
        throw error;
    }
}
export async function sendFile({ uid, filename }) {
    try {
        const file = await File.findOne({ user: uid, fileName: filename });
        return file;
    }
    catch (error) {
        throw error;
    }
}
export async function getAllFiles({ uid }) {
    try {
        const files = await File.find({ user: uid, archived: false });
        return files;
    }
    catch (error) {
        throw error;
    }
}
export async function getAllFileByProject({ uid, pid }) {
    try {
        const files = await File.find({ project: pid, user: uid, archived: false });
        return files;
    }
    catch (error) {
        throw error;
    }
}
export async function getunTrashed({ uid }) {
    try {
        const files = await File.find({ user: uid, deleted: false });
        return files;
    }
    catch (error) {
        throw error;
    }
}
export async function getTrashed({ uid }) {
    try {
        const files = await File.find({ user: uid, deleted: true });
        return files;
    }
    catch (error) {
        throw error;
    }
}
export async function saveFiles({ files }) {
    try {
        const uploadedFiles = await File.insertMany(files);
        return uploadedFiles;
    }
    catch (error) {
        throw error;
    }
}
export async function updateFile({ uid, id, name }) {
    try {
        const file = await File.findOne({ user: uid, _id: id });
        const newPath = file.path.split('-').slice(0, -1).concat(name).join('-');
        const newfileName = file.fileName.split('-').slice(0, -1).concat(name).join('-');
        file.originalName = name;
        file.fileName = newfileName;
        file.path = newPath;
        file.save();
        return file;
    }
    catch (error) {
        throw error;
    }
}
export async function trashFile({ id }) {
    try {
        const file = await File.findOne({ _id: id });
        file.deleted = true;
        file.save();
        return file;
    }
    catch (error) {
        throw error;
    }
}
export async function restoreFile({ id }) {
    try {
        const file = await File.findOne({ _id: id });
        file.deleted = false;
        file.save();
        return file;
    }
    catch (error) {
        throw error;
    }
}
export async function deleteFile({ uid, id }) {
    try {
        const deleted = await File.deleteOne({ user: uid, _id: id });
        return deleted;
    }
    catch (error) {
        throw error;
    }
}
export async function emptyTrash({ uid }) {
    try {
        const deleted = await File.updateMany({ user: uid, deleted: true }, { archived: true });
        return deleted;
    }
    catch (error) {
        throw new Error('Error Deleting::' + error.message);
    }
}
//# sourceMappingURL=file.service.js.map