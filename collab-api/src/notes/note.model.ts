import { Schema } from 'mongoose';

export const NoteSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  attachments: { type: [Schema.Types.Mixed] },
  comments: { type: [String] },
});

export class Note {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public attachments: any[],
    public comments: string[],
  ) {}
}
