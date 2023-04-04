import { model, Schema, Document } from 'mongoose';

interface IProject {
  name: string;
  user: string;
}
interface IProjectDocument extends IProject, Document {
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please enter project name'],
      //TODO:project name must be unique to the owner's context, for now this is implemented in the service layer better if implemented using mongoose validators
    },
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  },
  { timestamps: true }
);

const Project = model<IProjectDocument>('project', projectSchema);

export { Project };
