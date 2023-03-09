import { Schema, model, Types, Document } from 'mongoose';

interface IFileDocument extends Document {
  path: string;
  originalName: string;
  link?: string;
  mimeType: string;
  project: Types.ObjectId;
  user: Types.ObjectId;
}

const fileSchema = new Schema(
  {
    path: {
      type: String,
      trim: true,
      required: [true, 'Path must be provided'],
    },
    originalName: {
      type: String,
      required: [true, 'Originalname is required'],
    },
    mimeType: {
      type: String,
      required: [true, 'mimeType is required'],
    },
    link: { type: String, trim: true },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'project',
      required: [true, 'Project is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'User is required'],
    },
  },
  { timestamps: true }
);

const File = model<IFileDocument>('file', fileSchema);

export { File };
