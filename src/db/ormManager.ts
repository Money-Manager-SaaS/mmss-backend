import { getManager } from 'typeorm';

export const getOrmManager = () => {
  return getManager();
};
