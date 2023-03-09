import { model, Schema, Types, Document } from 'mongoose';

interface IProjectDocument extends Document {
  name: string;
  user: Types.ObjectId;
}

const projectSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please enter project name'],
  },
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
});

const Project = model<IProjectDocument>('project', projectSchema);

export { Project };
