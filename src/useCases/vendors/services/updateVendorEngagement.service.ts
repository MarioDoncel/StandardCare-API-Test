import { VendorModel } from '../../../Database/model/Vendors';
import { IVendor } from '../../../interfaces/Vendor';

export const updateVendorEngagementService = async (
  vendorName: string,
  engagement: string
) => {
  const updatedVendor: IVendor | null = await VendorModel.findOneAndUpdate(
    { vendorName },
    { engagement, updateDate: Date.now() },
    {
      new: true,
    }
  );
  return updatedVendor;
};
