import { File } from '../model/file.model.js';
import * as projectService from '../service/project.service.js';
const getAllProject = async (req, res) => {
    const projects = await projectService.readAllProject({ uid: req.user_id });
    res.status(200).json(projects);
};
const getProjectByName = async (req, res) => {
    try {
        const project = await projectService.getProjectByName({ name: req.params.name });
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
const getProjectFiles = async (req, res) => {
    const { id } = req.params;
    try {
        const files = await File.find({ project: id });
        res.status(200).json({ files });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
const createProject = async (req, res) => {
    const { name } = req.body;
    try {
        const project = await projectService.createProject({ name, uid: req.user_id });
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
const updateProject = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    try {
        const updated = await projectService.updateProject({ uid: req.user_id, pid: id, name: name });
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProject = await projectService.deleteProject({ uid: req.user_id, pid: id });
        res.status(200).json(deleteProject);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
export default {
    getAllProject,
    getProjectFiles,
    getProjectByName,
    createProject,
    updateProject,
    deleteProject,
};
//# sourceMappingURL=project.controller.js.map