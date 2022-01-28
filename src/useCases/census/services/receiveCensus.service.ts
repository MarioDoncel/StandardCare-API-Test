import { CensusModel } from '../../../Database/model/Census';
import { ICensus } from '../../../interfaces/Census';

export const receiveCensusService = async (
  census: ICensus[]
): Promise<void> => {
  census.forEach(async (user) => {
    await CensusModel.create({
      name: user.name,
      dateOfBirth: user.dateOfBirth,
      clientName: user.clientName,
    });
  });
};
