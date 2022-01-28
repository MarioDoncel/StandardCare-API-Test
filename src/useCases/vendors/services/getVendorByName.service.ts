import { VendorModel } from '../../../Database/model/Vendors';
import DatabaseError from '../../../errors/DatabaseError';
import { IVendor } from '../../../interfaces/Vendor';

export const getVendorByNameService = async (
  vendorName: string
): Promise<IVendor> => {
  const vendor = await VendorModel.findOne({ vendorName });

  if (vendor) return vendor;

  throw new DatabaseError('Vendor not found', '', 400);
};
