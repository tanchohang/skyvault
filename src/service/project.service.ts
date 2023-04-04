import { Types } from 'mongoose';
import { Project } from '../model/project.model.js';

export async function isProject({ uid, pid }: { uid: string; pid: string }): Promise<boolean> {
  const project = await Project.findOne({
    user: uid,
    _id: pid,
  });
  return project ? true : false;
}
export async function getProjectById({ id }: { id: string }): Promise<any> {}

// export async function getAllFiles({ pid }: { pid: string }): Promise<any> {
//   const project = await Project.findById(pid);
// }

export async function getProjectByName({ name }: { name: string }): Promise<any> {
  const project = await Project.findOne({ name });
  return project;
}

//CRUD functions

export async function createProject({ uid, name }: { uid: string; name: string }): Promise<any> {
  const project = await Project.create({ user: uid, name });
  return project;
}

export async function readAllProject({ uid }: { uid: string }): Promise<any> {
  const projects = await Project.find({ user: uid });
  return projects;
}

export async function updateProject({ uid, pid, name }: { uid: string; pid: string; name: string }): Promise<any> {
  const project = await Project.findByIdAndUpdate({ user: uid, _id: pid }, { name }, { new: true });
  return project;
}

export async function deleteProject({ uid, pid }: { uid: string; pid: string }): Promise<any> {
  const deleted = await Project.deleteOne({ user: uid, _id: pid });
  return deleted;
}
