import knex from 'knex';

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

// for manual testing only
const main = async () => {
    const client = getKnexDB('./demo.mmb')
    console.log(
        await client.select('*').from('CHECKINGACCOUNT_V1')
    );
    client.destroy();
    // console.log(await Transaction.fetchAll());

}

// main();
