import { CensusModel } from '../../../Database/model/Census';
import { ICensus } from '../../../interfaces/Census';

export const getCensusByClientService = async (
  clientName: string
): Promise<ICensus[]> => {
  const census = await CensusModel.find({ clientName });
  return census;
};
