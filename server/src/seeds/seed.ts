import db from '../config/connection';
import { Job } from '../models';
import jobSeeds from './jobsData.json';

db.once('open', async () => {
  await Job.deleteMany({});
  await Job.create(jobSeeds);

  console.log('all done');
  process.exit(0);
});
