import { Project } from '../model/project.model.js';

export async function isProject(uid: string, pid: string): Promise<boolean> {
  const project = await Project.find({ user: uid, _id: pid });
  if (project) {
    return true;
  }
  return false;
}
