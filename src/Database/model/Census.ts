import mongoose from 'mongoose';

import { ICensus } from '../../interfaces/Census';

const schema = new mongoose.Schema<ICensus>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
});

export const CensusModel = mongoose.model<ICensus>('census', schema);
