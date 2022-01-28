import mongoose from 'mongoose';

import { IVendor } from '../../interfaces/Vendor';

const schema = new mongoose.Schema<IVendor>(
  {
    name: { type: String, required: true, unique: true },
    engagement: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const VendorModel = mongoose.model<IVendor>('vendors', schema);
