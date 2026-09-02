import { Schema, model } from 'mongoose';

export interface Team {
  name: string;
  color: string;
  captain: Schema.Types.ObjectId;
  totalPoints: number;
}

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    captain: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalPoints: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

export const TeamModel = model<Team>('Team', teamSchema);
