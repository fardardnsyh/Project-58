import { AuthenticationError } from 'apollo-server-express';
import mongoose, { ObjectId } from 'mongoose';

import { Job, User } from '../models';
import { signToken } from '../utils/auth';

type UserType = {
  name?: string;
  lastName?: string;
  email: string;
  location?: string;
  password: string;
};

type JobType = {
  _id?: string;
  company: string;
  position: string;
  location: string;
  status: string;
  type: string;
  createdBy: string;
};

const resolvers = {
  Query: {
    me: async (_: unknown, __: unknown, context: { user: { _id: ObjectId } }) => {
      try {
        if (context.user) {
          return await User.findById(context.user._id);
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    getAllUsers: async () => {
      try {
        return User.find();
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    getUserById: async (_: unknown, { _id }: { _id: ObjectId }) => {
      try {
        return User.findById(_id);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    getAllJobs: async (_: unknown, __: unknown, context: { user: { _id: ObjectId } }) => {
      try {
        if (context.user) {
          return await Job.find({ createdBy: context.user._id });
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    getJobById: async (_: unknown, { _id }: { _id: ObjectId }) => {
      try {
        return Job.findById(_id);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    showStats: async (_: unknown, __: unknown, context: { user: { _id: mongoose.Types.ObjectId } }) => {
      if (context.user) {
        try {
          const tempStats = await Job.aggregate([
            { $match: { createdBy: new mongoose.Types.ObjectId(context.user._id) } },
            { $group: { _id: '$status', count: { $sum: 1 } } },
          ]);
          const stats: { _id: string; count: number }[] = [
            { _id: 'pending', count: 0 },
            { _id: 'interview', count: 0 },
            { _id: 'declined', count: 0 },
          ];
          tempStats.forEach((record) => {
            switch (record._id) {
              case 'pending':
                stats[0].count = record.count;
                return;
              case 'interview':
                stats[1].count = record.count;
                return;
              default:
                stats[2].count = record.count;
                return;
            }
          });
          return stats;
        } catch (error: any) {
          throw new Error(error.message);
        }
      }
    },
    monthlyApplications: async (_: unknown, __: unknown, context: { user: { _id: mongoose.Types.ObjectId } }) => {
      if (context.user) {
        try {
          return await Job.aggregate([
            { $match: { createdBy: new mongoose.Types.ObjectId(context.user._id) } },
            {
              $group: {
                _id: {
                  year: {
                    $year: '$createdAt',
                  },
                  month: {
                    $month: '$createdAt',
                  },
                },
                count: { $sum: 1 },
              },
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } },
            { $limit: 6 },
          ]);
        } catch (error: any) {
          throw new Error(error.message);
        }
      }
    },
  },
  Mutation: {
    addUser: async (_: unknown, { name, email, password }: UserType) => {
      try {
        const user = await User.create({ name, email, password });
        user.password = null;
        const token = signToken(user);
        return { token, user };
      } catch (error: any) {
        throw new Error(error);
      }
    },
    updateUser: async (
      _: unknown,
      { name, lastName, email, location }: UserType,
      context: { user: { _id: ObjectId } }
    ) => {
      try {
        if (context.user._id) {
          const user = await User.findByIdAndUpdate(
            context.user._id,
            {
              name,
              lastName,
              email,
              location,
            },
            {
              new: true,
              runValidators: true,
            }
          );
          user.password = null;
          const token = signToken(user);
          return { token, user };
        }
      } catch (error: any) {
        throw new Error(error);
      }
    },
    login: async (_: unknown, { email, password }: UserType) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError('Invalid credentials');
        }

        const correctPassword = await user.isCorrectPassword(password);

        if (!correctPassword) {
          throw new AuthenticationError('Invalid credentials');
        }

        user.password = null;
        const token = signToken(user);
        return { token, user };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    addJob: async (
      _: unknown,
      { company, position, location, status, type }: JobType,
      context: { user: { _id: ObjectId } }
    ) => {
      try {
        if (context.user._id) {
          const job = await Job.create({ company, position, location, status, type, createdBy: context.user._id });
          return job;
        } else {
          throw new AuthenticationError('User not logged in');
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    deleteJob: async (_: unknown, { _id }: { _id: ObjectId }, context: { user: { _id: ObjectId } }) => {
      if (context.user) {
        try {
          return Job.findByIdAndDelete(_id);
        } catch (error: any) {
          throw new Error(error.message);
        }
      }
    },
    editJob: async (
      _: unknown,
      { _id, company, position, location, status, type }: JobType,
      context: { user: { _id: ObjectId } }
    ) => {
      if (context.user) {
        try {
          return Job.findByIdAndUpdate(_id, {
            company,
            position,
            location,
            status,
            type,
          });
        } catch (error: any) {
          throw new Error(error.message);
        }
      }
    },
  },
};

export default resolvers;
