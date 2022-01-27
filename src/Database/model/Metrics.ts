import mongoose from 'mongoose';

import { IMetrics } from '../../interfaces/Metrics';

const schema = new mongoose.Schema<IMetrics>({
  vendorName: { type: String, required: true },
  engagement: { type: Number, required: true },
  otherMetrics: { type: Number },
  updateDate: { type: Date, required: true, default: Date.now },
});

export const MetricsModel = mongoose.model<IMetrics>('metrics', schema);
