import { Ledger } from '../entity/Ledger';

export const getLedger = async (req, res, next) => {
  const ledgerID = req?.params?.ledgerID;
  if (!ledgerID) {
    res.status(400).send('ledger id is required');
  }
};
