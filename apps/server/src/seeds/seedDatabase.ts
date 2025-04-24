import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from '../mongoDB/config/connection.js';
import { User } from '../mongoDB/models/User.js';
import Discussion from '../mongoDB/models/Discussion.js';

export const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('⚡ MongoDB connected');

    await mongoose.connection.dropDatabase();
    console.log('🧹 Dropped existing database');

    // Sample user
    const sampleUser = new User({
      username: 'jane_doe',
      email: 'jane@example.com',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Doe',
      bio: 'Healthcare professional with a passion for mental health advocacy. Transitioning into tech!',
      about: 'I’m a former nurse turned software developer. I love creating tools that make a difference in people’s lives.',
    });

    await sampleUser.save();
    console.log(`👤 Created user: ${sampleUser.username}`);

    const discussions = await Discussion.insertMany([
      {
        title: 'Managing Stress as a Healthcare Worker',
        content: 'Healthcare workers often face intense stress. How do you cope with daily stressors?',
        keywords: ['Mental Health', 'Burnout', 'Wellness'],
        author: sampleUser._id,
      },
      {
        title: 'Transitioning from Nursing to Tech',
        content: 'I’m considering a career change to software development. Has anyone else made the switch?',
        keywords: ['Career Change', 'Burnout', 'Nursing', 'Mental Health', 'Tech Industry'],
        author: sampleUser._id,
      },
      {
        title: 'Best Self-Care Practices for Night Shift Nurses',
        content: 'Working night shifts has affected my sleep and mental health. Any advice?',
        keywords: ['Self-Care', 'Mental Health', 'Night Shift', 'Healthcare'],
        author: sampleUser._id,
      },
      {
        title: 'How Therapy Helped Me as a Doctor',
        content: 'I was skeptical about therapy at first, but it changed my approach to stress management.',
        keywords: ['Therapy', 'Mental Health', 'Support'],
        author: sampleUser._id,
      },
      {
        title: 'Is Burnout Inevitable in Healthcare?',
        content: 'I\'ve seen too many colleagues leave the field due to burnout. Can we prevent it?',
        keywords: ['Burnout', 'Healthcare', 'Mental Health', 'Wellness'],
        author: sampleUser._id,
      },
    ]);

    console.log(`🗣️ Seeded ${discussions.length} discussions`);
    console.log('✅ Seeded all data successfully');
  } catch (err) {
    console.log('❌ Error during seeding:');
    console.error(err);
  } 
};
