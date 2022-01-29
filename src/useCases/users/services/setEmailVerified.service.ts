import { VendorModel } from '../../../Database/model/Vendors';
import DatabaseError from '../../../errors/DatabaseError';
import { IVendor } from '../../../interfaces/Vendor';

export const setEmailVerifiedService = async (id: string) => {
  const vendor: IVendor | null = await VendorModel.findOneAndUpdate(
    { _id: id },
    { emailVerified: true },
    { new: true }
  );
  if (!vendor) throw new DatabaseError('Vendor not found');
  return vendor;
};
