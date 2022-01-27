import mongoose from 'mongoose';

import { ICensus } from '../../interfaces/Census';

const schema = new mongoose.Schema<ICensus>({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  clientName: { type: String, required: true },
});

export const CensusModel = mongoose.model<ICensus>('census', schema);
