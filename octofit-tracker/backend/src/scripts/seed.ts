import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { ActivityModel } from '../models/Activity.js';
import { LeaderboardModel } from '../models/Leaderboard.js';
import { TeamModel } from '../models/Team.js';
import { UserModel } from '../models/User.js';
import { WorkoutModel } from '../models/Workout.js';

/** Seed the octofit_db database with test data. */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const users = await UserModel.insertMany([
      { name: 'Maya Chen', email: 'maya.chen@mergington.edu', avatar: 'MC', totalPoints: 245 },
      { name: 'Jordan Williams', email: 'jordan.williams@mergington.edu', avatar: 'JW', totalPoints: 210 },
      { name: 'Sofia Rodriguez', email: 'sofia.rodriguez@mergington.edu', avatar: 'SR', totalPoints: 185 },
      { name: 'Ethan Brooks', email: 'ethan.brooks@mergington.edu', avatar: 'EB', totalPoints: 160 },
    ]);

    const teams = await TeamModel.insertMany([
      { name: 'Summit Sprinters', color: '#ef8354', captain: users[0]._id, totalPoints: 455 },
      { name: 'Trail Blazers', color: '#2f6690', captain: users[2]._id, totalPoints: 345 },
    ]);

    await UserModel.bulkWrite([
      { updateOne: { filter: { _id: users[0]._id }, update: { team: teams[0]._id } } },
      { updateOne: { filter: { _id: users[1]._id }, update: { team: teams[0]._id } } },
      { updateOne: { filter: { _id: users[2]._id }, update: { team: teams[1]._id } } },
      { updateOne: { filter: { _id: users[3]._id }, update: { team: teams[1]._id } } },
    ]);

    await ActivityModel.insertMany([
      { user: users[0]._id, type: 'Running', durationMinutes: 35, points: 90, completedAt: new Date('2026-08-29T16:30:00Z') },
      { user: users[1]._id, type: 'Strength Training', durationMinutes: 45, points: 85, completedAt: new Date('2026-08-30T15:00:00Z') },
      { user: users[2]._id, type: 'Cycling', durationMinutes: 50, points: 95, completedAt: new Date('2026-08-30T17:15:00Z') },
      { user: users[3]._id, type: 'Walking', durationMinutes: 40, points: 60, completedAt: new Date('2026-08-31T14:00:00Z') },
    ]);

    await LeaderboardModel.insertMany([
      { user: users[0]._id, team: teams[0]._id, points: 245, rank: 1, period: 'August 2026' },
      { user: users[1]._id, team: teams[0]._id, points: 210, rank: 2, period: 'August 2026' },
      { user: users[2]._id, team: teams[1]._id, points: 185, rank: 3, period: 'August 2026' },
      { user: users[3]._id, team: teams[1]._id, points: 160, rank: 4, period: 'August 2026' },
    ]);

    await WorkoutModel.insertMany([
      { title: 'After-School Cardio Boost', category: 'Cardio', difficulty: 'Beginner', durationMinutes: 20, exercises: ['Jumping jacks', 'High knees', 'Mountain climbers'] },
      { title: 'Full-Body Strength Circuit', category: 'Strength', difficulty: 'Intermediate', durationMinutes: 30, exercises: ['Squats', 'Push-ups', 'Lunges', 'Plank'] },
      { title: 'Recovery and Mobility Flow', category: 'Mobility', difficulty: 'Beginner', durationMinutes: 15, exercises: ['Cat-cow', "World's greatest stretch", "Child's pose"] },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts');
  } catch (error) {
    console.error('Error seeding octofit_db:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
