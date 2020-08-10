/**
 * update this for default ledger init
 */
export default {
  ledger: {
    name: 'Default',
    description: 'a default ledger for getting startted',
  },
  accounts: [
    {
      name: 'cash account',
      description: '',
      amount: 0,
    },
    {
      name: 'debit account',
      description: '',
      amount: 0,
    }, {
      name: 'credit account',
      description: '',
      amount: 0,
    }
  ],
  categories: [
    {
      name: 'Food',
      description: 'vegetables, fruit, etc',
      ledgerID: null,
    },
    {
      name: 'Accommodation',
      description: 'renting or housing',
    },
    {
      name: 'Petrol/Gas',
      description: '',
    },
    {
      name: 'Investment',
      description: '',
    },
    {
      name: 'Salary',
      description: 'stable income',
    },
    {
      name: 'Part time wage',
      description: 'unstable income',
    },
  ],
  payees: [
    {
      name: 'Employer',
      description: 'the Boss',
    },
    {
      name: 'MM-Cloud',
      description: 'the best accounting and money tracker SaaS provider',
    },
  ]
}
