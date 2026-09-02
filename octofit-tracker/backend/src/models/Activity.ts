import { Schema, model } from 'mongoose';

export interface Activity {
  user: Schema.Types.ObjectId;
  type: 'Running' | 'Walking' | 'Strength Training' | 'Cycling';
  durationMinutes: number;
  points: number;
  completedAt: Date;
}

const activitySchema = new Schema<Activity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['Running', 'Walking', 'Strength Training', 'Cycling'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const ActivityModel = model<Activity>('Activity', activitySchema);
