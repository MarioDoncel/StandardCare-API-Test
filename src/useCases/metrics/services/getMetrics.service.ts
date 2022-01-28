import { MetricsModel } from '../../../Database/model/Metrics';
import DatabaseError from '../../../errors/DatabaseError';
import { IMetrics } from '../../../interfaces/Metrics';

export const getMetricsService = async (
  vendorName: string
): Promise<IMetrics> => {
  const metrics = await MetricsModel.findOne({ vendorName });

  if (metrics) return metrics;

  throw new DatabaseError('Metrics not found', '', 400);
};
