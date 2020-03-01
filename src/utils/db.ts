import knex from 'knex';
import bookshelf from 'bookshelf';



export const getKnexDB = (fileName: string):any => {
    if (process.env.NODE_ENV || true) {
        return knex(
            {
                client: 'sqlite3',
                connection: {
                    filename: fileName
                }
            }
        )
    } else {
        return knex(
            {
                client: 'pg',
                connection: process.env.PG_CONNECTION_STRING,
                searchPath: ['knex', 'public'],
                }
        )
    }
};



export const getBookShelf = (fileName:string) => {
    return require('bookshelf')(getKnexDB(fileName));
};



// getKnexDB('./demo.mmb');
const bk = getBookShelf('./demo.mmb');
// console.log(bk);

const Transaction = bk.model('Transaction', {
    tableName: 'CHECKINGACCOUNT_V1',
});


const main = async () => {
    const client = getKnexDB('./demo.mmb')
    console.log(
        await client.select('*').from('CHECKINGACCOUNT_V1')
    );
    client.destroy();
    // console.log(await Transaction.fetchAll());

}

main();
