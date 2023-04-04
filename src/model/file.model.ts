import { Schema, model, Document } from 'mongoose';
export interface IFile {
  path: string;
  fileName: string;
  originalName: string;
  link: string;
  deleted: boolean;
  archived: boolean;
  public: boolean;
  mimeType: string;
  project: string;
  user: string;
}
export interface IFileDocument extends IFile, Document {
  createdAt: Date;
  updatedAt: Date;
}

const fileSchema = new Schema(
  {
    path: {
      type: String,
      trim: true,
      required: [true, 'Path must be provided'],
    },
    fileName: {
      type: String,
      required: [true, 'Filename is required'],
      unique: true,
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
    deleted: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
    public: { type: Boolean, default: false },

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
