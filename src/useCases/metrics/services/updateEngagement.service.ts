import { MetricsModel } from '../../../Database/model/Metrics';
import { IMetrics } from '../../../interfaces/Metrics';

export const updateEngagementService = async (
  vendorName: string,
  engagement: number
) => {
  const updatedMetrics: IMetrics = await MetricsModel.findOneAndUpdate(
    { vendorName },
    { engagement, updateDate: Date.now() },
    {
      new: true,
      upsert: true,
    }
  );
  return updatedMetrics;
};
