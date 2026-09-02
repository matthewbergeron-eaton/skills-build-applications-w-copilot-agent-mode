import { Schema, model } from 'mongoose';

export interface User {
  name: string;
  email: string;
  avatar: string;
  team?: Schema.Types.ObjectId;
  totalPoints: number;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    totalPoints: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

export const UserModel = model<User>('User', userSchema);
