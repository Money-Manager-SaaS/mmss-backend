import { Ledger } from '../entity/Ledger';
import logger from '../logger';

export const getLedger = async (req, res, next) => {
  const ledgerID = req?.params?.ledgerID;
  if (!ledgerID) {
    res.status(400).send('ledger id is required');
  }
  try {
    const ledger = await Ledger.getRepo().findOne(ledgerID);
    logger.debug('middleware ledger req');
    logger.debug(ledger);
    logger.debug( req.user.id)
    if (!ledger || ledger.userId !== req.user.id) {
      res.status(403).send('forbidden for this ledger');
    }
    req.ledgerID = ledgerID;
    next();
  } catch (e) {
    logger.error(e);
    res.status(400).send('ledger id is required');
  }
};
