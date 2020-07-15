import { Response } from 'express';
import { Ledger } from '../../entity/Ledger';
import * as transProvider from '../transaction/transProvider';

export const getAll = async (req: any, res: Response) => {
  const ledgerRepo = Ledger.getRepo();
  const ledgerID = req.params?.ledgerID;
  try {
    const ledger = await ledgerRepo.findOne(ledgerID, {
      relations: ["accounts", "categories", "payees"],
    });
    if (ledger && ledger.userId === req.user.id) {
      try {
        const [items, count] = await transProvider.getAll(req.query, req.accounts);
        res.status(200).send({
          data: {
            ledger,
            transactions: items
          },
          count: items.length, //todo remove count
          total: count,
        });
      } catch (e) {
        res.status(500).end();
      }
    } else {
      res.status(204).send({});
    }
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};
