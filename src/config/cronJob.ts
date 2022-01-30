import { RefreshTokenModel } from '../Database/model/ValidRefreshTokens';

export const deleteExpiredRefreshTokens = async () => {
  try {
    const deleted = await RefreshTokenModel.deleteMany({
      expiresIn: { $lte: Date.now() },
    });
    console.log(deleted);
  } catch (error) {
    console.log(error);
  }
};
