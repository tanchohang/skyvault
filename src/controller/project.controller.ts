import { Request, Response } from 'express';
import { File } from '../model/file.model.js';
import * as projectService from '../service/project.service.js';

const getAllProject = async (req: Request, res: Response) => {
  const projects = await projectService.readAllProject({ uid: req.user_id });
  res.status(200).json(projects);
};
const getProjectByName = async (req: Request, res: Response) => {
  try {
    const project = await projectService.getProjectByName({ name: req.params.name });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getProjectFiles = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const files = await File.find({ project: id });
    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const createProject = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const project = await projectService.createProject({ name, uid: req.user_id });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateProject = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    const updated = await projectService.updateProject({ uid: req.user_id, pid: id, name: name });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteProject = await projectService.deleteProject({ uid: req.user_id, pid: id });
    res.status(200).json(deleteProject);
  } catch (error) {
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
