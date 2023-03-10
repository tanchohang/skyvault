import { Request, Response } from 'express';
import { File } from '../model/file.model.js';
import { Project } from '../model/project.model.js';

const getAllProject = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({ user: req.user_id });
    res.status(200).json({ projects });
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
    let project = await Project.create({ name, user: req.user_id });
    res.status(200).json({ project });
  } catch (err) {
    res.status(500).json({ errors: err.errors });
  }
};

export default { getAllProject, getProjectFiles, createProject };
