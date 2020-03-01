import { getKnexDB } from "../../utils/db";
import path from "path";

const sampleDB= path.resolve(__dirname, '../../../demo.mmb');

export const index = async () => {
    const client = getKnexDB(sampleDB);
    const r= await client.select('*').from('CHECKINGACCOUNT_V1');
    client.destroy();
    return r;
};
