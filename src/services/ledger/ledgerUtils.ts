import { IsNull } from 'typeorm';

export const getFindOption = (userID) => (
  {
    where: {
      userId: userID,
      deletedAt: IsNull()
    }
  }
);
