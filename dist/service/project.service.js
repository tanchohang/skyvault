import { Project } from '../model/project.model.js';
export async function isProject({ uid, pid }) {
    const project = await Project.findOne({
        user: uid,
        _id: pid,
    });
    return project ? true : false;
}
export async function getProjectById({ id }) { }
// export async function getAllFiles({ pid }: { pid: string }): Promise<any> {
//   const project = await Project.findById(pid);
// }
export async function getProjectByName({ name }) {
    const project = await Project.findOne({ name });
    return project;
}
//CRUD functions
export async function createProject({ uid, name }) {
    const project = await Project.create({ user: uid, name });
    return project;
}
export async function readAllProject({ uid }) {
    const projects = await Project.find({ user: uid });
    return projects;
}
export async function updateProject({ uid, pid, name }) {
    const project = await Project.findByIdAndUpdate({ user: uid, _id: pid }, { name }, { new: true });
    return project;
}
export async function deleteProject({ uid, pid }) {
    const deleted = await Project.deleteOne({ user: uid, _id: pid });
    return deleted;
}
//# sourceMappingURL=project.service.js.map