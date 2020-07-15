import { getFindOption, getQueryOptions } from './utils';
import logger from '../../logger';
import { Transaction as Entity } from '../../entity/Transaction';
import { Account } from '../../entity/Account';

/**
 * for transactions there is a hard limit 500
 * @param query
 * @param accounts
 */
export const getAll = async (query, accounts: Account[]) => {
  const entityRepo = Entity.getRepo();
  let option = getFindOption(accounts);
  option = getQueryOptions(query, option);

  logger.debug('# to get all req transactions option');
  logger.debug(option);

  // do not use find and count, not work with skip and limit
  const result = await entityRepo.findAndCount(
    option
  );

  return result;
}
