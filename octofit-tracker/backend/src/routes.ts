import { Router } from 'express';
import type { Model } from 'mongoose';
import { ActivityModel } from './models/Activity.js';
import { LeaderboardModel } from './models/Leaderboard.js';
import { TeamModel } from './models/Team.js';
import { UserModel } from './models/User.js';
import { WorkoutModel } from './models/Workout.js';

type ResourceName = 'users' | 'teams' | 'activities' | 'leaderboard' | 'workouts';

function createResourceRouter(resource: ResourceName, model: Model<any>, populate: string[] = []) {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      const query = model.find().sort({ createdAt: -1 });
      populate.forEach((path) => query.populate(path));
      const data = await query.exec();
      response.json({ resource, data });
    } catch (error) {
      next(error);
    }
  });

  return router;
}

export const usersRouter = createResourceRouter('users', UserModel, ['team']);
export const teamsRouter = createResourceRouter('teams', TeamModel, ['captain']);
export const activitiesRouter = createResourceRouter('activities', ActivityModel, ['user']);
export const leaderboardRouter = createResourceRouter('leaderboard', LeaderboardModel, ['user', 'team']);
export const workoutsRouter = createResourceRouter('workouts', WorkoutModel);
