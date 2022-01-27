import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

import { IVendor } from '../../interfaces/Vendor';

const schema = new mongoose.Schema<IVendor>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  averageEngagement: { type: Number, required: true },
});

export const VendorModel = mongoose.model<IVendor>('vendors', schema);
