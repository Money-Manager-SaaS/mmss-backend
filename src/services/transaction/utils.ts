import { Account } from '../../entity/Account';
import logger from '../../logger';
import { In, LessThanOrEqual, Like, MoreThanOrEqual } from 'typeorm';

export const DEFAULT_LIMIT = 500

export const getFindOption = (body: any, ledgerAccounts: Account[]) => {
  logger.debug('the ledger accounts in req');
  logger.debug(ledgerAccounts);

  const conditions = {
    accountId: In(ledgerAccounts.map(acc=>acc.id))
  };

  return {
    where: conditions,
  }
};


export const getQueryOptions = (query:any, option:any) => {
  Object.assign(option, {
    take: DEFAULT_LIMIT
  });

  if (query.limit) {
    Object.assign(option,
      {
        take: query.limit < DEFAULT_LIMIT ? query.limit : DEFAULT_LIMIT
      }
    )
  }
  if (query.skip) {
    Object.assign(option,
      {
        skip: query.skip
      }
    );
  }
  if (query.accountID) {
    Object.assign(option.where,
      {
        accountId: query.accountID
      }
    )
  }
  if (query.toAccountID) {
    Object.assign(option.where,
      {
        toAccountId: query.toAccountID
      }
    )
  }
  if (query.categoryID) {
    Object.assign(option.where,
      {
        categoryId: query.categoryID
      }
    )
  }
  if (query.payeeID) {
    Object.assign(option.where,
      {
        payeeId: query.payeeID
      }
    )
  }
  if (query.gt) {
    logger.debug('found query gt ')
    Object.assign(option.where,
      {
        amount: MoreThanOrEqual(query.gt)
      }
    )
    logger.debug(option);
    logger.debug(option.where);
  }
  if (query.lt) {
    const whereCondition = {
      amount: LessThanOrEqual(query.lt)
    };
    if ('amount' in option.where) {
      option.where.push(whereCondition);
    } else {
      Object.assign(option.where,
        whereCondition
      )
    }
  }
  if (query.dateStart) {
    Object.assign(option.where,
      {
        date: MoreThanOrEqual(query.dateStart)
      }
    )
  }
  if (query.dateEnd) {
    const whereCondition = {
      date: LessThanOrEqual(query.dateEnd)
    };
    if ('date' in option.where) {
      option.where.push(whereCondition);
    } else {
      Object.assign(option.where,
        whereCondition
      )
    }
  }
  if (query.description) {
    Object.assign(option.where,
      {
        description: Like(`%${query.description}%`)
      }
    )
  }
  return option;
}
