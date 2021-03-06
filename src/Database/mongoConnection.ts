import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

import { environmentVariables } from '../config/environment';

const MongoConnection = async () => {
  try {
    await mongoose.connect(environmentVariables.MONGO_CONNECTION);

    console.log('💾:Database Connected');
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

autoIncrement.initialize(mongoose.connection);

export default MongoConnection;
