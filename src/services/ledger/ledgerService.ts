import { Response } from 'express';
import { Ledger } from '../../entity/Ledger';
import { Account } from '../../entity/Account';
import { Payee } from '../../entity/Payee';
import { Category } from '../../entity/Category';
import { getFindOption } from './ledgerUtils';
import defaultLedgerData from './defaultLedger';

export const getAll = async (req: any, res: Response) => {
  const ledgerRepo = Ledger.getRepo();
  try {
    const ledgers = await ledgerRepo.find(
      getFindOption(req.user.id)
    );
    if (ledgers?.length) {
      res.status(200).send(ledgers);
    } else {
      res.status(204).send([]);
    }
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};


export const getOne = async (req: any, res: Response) => {
  const ledgerRepo = Ledger.getRepo();
  const ledgerID = req.params?.ledgerID;
  try {
    const ledger = await ledgerRepo.findOne(ledgerID,
      Object.assign({}, getFindOption(req.user.id), {
        relations: ["accounts", "categories", "payees"],
      })
    );
    if (ledger && ledger.userId === req.user.id) {
      res.status(200).send(ledger);
    } else {
      res.status(204).send({});
    }
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const createOne = async (req, res: Response) => {
  const ledgerRepo = Ledger.getRepo();
  try {
    const ledger = await ledgerRepo.create(req.body) as unknown as Ledger;
    ledger.user = req.user;
    await ledgerRepo.save(ledger);
    delete ledger.user.password;
    res.status(200).send(ledger);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const updateOne = async (req, res: Response) => {
  const ledgerID = req.params?.ledgerID;
  const ledgerRepo = Ledger.getRepo();
  try {
    const ledger = await ledgerRepo.findOne(ledgerID, getFindOption(req.user.id));
    if (ledger && ledger.userId === req.user.id) {
      const r = await ledgerRepo.update(ledger.id, req.body);
      res.status(200).send(r);
    }
    res.status(400).end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const deleteOne = async (req, res: Response) => {
  const ledgerID = req.params?.ledgerID;
  const ledgerRepo = Ledger.getRepo();
  try {
    const ledger = await ledgerRepo.findOne(ledgerID, getFindOption(req.user.id));
    if (ledger && ledger.userId === req.user.id) {
      await ledgerRepo.softDelete(ledger.id);
      res.status(200).json({});
    } else {
      res.status(400).end();
    }
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const createDefault = async (req, res: Response) => {
  const ledgerRepo = Ledger.getRepo();
  let ledger;
  let code = 200;
  try {
    const ledgers = await ledgerRepo.find(
      Object.assign({},
        getFindOption(req.user.id), {
          name: 'Default'
        },
      )
    );
    if (ledgers.length) {
      ledger = ledgers[0];
      code = 200;
    } else {
      code = 201;
      ledger = await ledgerRepo.create(defaultLedgerData.ledger) as unknown as Ledger;
      ledger.user = req.user;
      await ledgerRepo.save(ledger);

      const calls = [];

      const createAccount = async (data) => {
        const repo = Account.getRepo();
        const item = (await repo.create(data)) as unknown as Account;
        item.ledgerId = ledger.id;
        await repo.save(item)
      }
      defaultLedgerData.accounts.forEach(
        data => {
          calls.push(
            createAccount(data)
          )
        }
      )

      const createCategory = async (data) => {
        const repo = Category.getRepo();
        const item = (await repo.create(data)) as unknown as Category;
        item.ledgerId = ledger.id;
        await repo.save(item)
      }
      defaultLedgerData.categories.forEach(
        data => {
          calls.push(
            createCategory(data)
          )
        }
      )

      const createPayee = async (data) => {
        const repo = Payee.getRepo();
        const item = (await repo.create(data)) as unknown as Payee;
        item.ledgerId = ledger.id;
        await repo.save(item)
      }
      defaultLedgerData.payees.forEach(
        data => {
          calls.push(
            createPayee(data)
          )
        }
      )

      await Promise.all(calls)
    }
    // todo save this one db hit
    ledger = await ledgerRepo.findOne(ledger.id,
      Object.assign({}, getFindOption(req.user.id), {
        relations: ["accounts", "categories", "payees"],
      })
    );

    res.status(code).send(ledger);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};
