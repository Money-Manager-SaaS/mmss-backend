import { Account } from '../../entity/Account';
import logger from '../../logger';
import { In, LessThanOrEqual, Like, MoreThanOrEqual } from 'typeorm';

export const DEFAULT_LIMIT = 500

export const getFindOption = (body: any, ledgerAccounts: Account[]) => {
  logger.debug('the ledger accounts in req');
  logger.debug(ledgerAccounts);

  const conditions = [{
    accountId: In(ledgerAccounts.map(acc=>acc.id))
  }];

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

  const whereConditions = option.where;
  const theFirstWhereCondition = whereConditions[0];

  if (query.accountID) {
    Object.assign(theFirstWhereCondition,
      {
        accountId: query.accountID
      }
    )
  }
  if (query.toAccountID) {
    Object.assign(theFirstWhereCondition,
      {
        toAccountId: query.toAccountID
      }
    )
  }
  if (query.categoryID) {
    Object.assign(theFirstWhereCondition,
      {
        categoryId: query.categoryID
      }
    )
  }
  if (query.payeeID) {
    Object.assign(theFirstWhereCondition,
      {
        payeeId: query.payeeID
      }
    )
  }
  if (query.gt) {
    logger.debug('found query gt ')
    Object.assign(theFirstWhereCondition,
      {
        amount: MoreThanOrEqual(query.gt)
      }
    )
    logger.debug(option);
    logger.debug(theFirstWhereCondition);
  }
  if (query.lt) {
    const whereCondition = {
      amount: LessThanOrEqual(query.lt)
    };
    Object.assign(theFirstWhereCondition,
      whereCondition
    )
  }
  if (query.dateStart) {
    Object.assign(theFirstWhereCondition,
      {
        date: MoreThanOrEqual(query.dateStart)
      }
    )
  }
  if (query.dateEnd) {
    const whereCondition = {
      date: LessThanOrEqual(query.dateEnd)
    };
    Object.assign(theFirstWhereCondition,
      whereCondition
    )
  }
  if (query.description) {
    Object.assign(theFirstWhereCondition,
      {
        description: Like(`%${query.description}%`)
      }
    )
  }

  whereConditions[0]=theFirstWhereCondition;
  option.where=whereConditions;
  return option;
}
