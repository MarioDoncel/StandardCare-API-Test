import { VendorModel } from '../../../Database/model/Vendors';
import { IVendor } from '../../../interfaces/Vendor';

export const createVendorService = async ({
  name,
  password,
}: ICreateVendorDto): Promise<IVendor> => {
  const vendor = await VendorModel.create({
    name,
    password,
  });
  return vendor;
};
