
const fs = require('fs').promises;
const { checkQuery, runAndCompareQuery, runAndCompareQueryPRO } = require('./utils/db');
const { storeData } = require('./utils/data');

let run = async () => {

  let args = process.argv.slice(2);

  if (args.length != 5) {
    console.log('Usage: node index.js [host] [port] [db] [key] [query]')
    return
  }

  let host = args[0];
  let port = args[1];
  let db = args[2];
  let _key = args[3];
  let _query = args[4];

  const key = await fs.readFile(`${__dirname}/${_key}`, 'utf-8');
  const query = await fs.readFile(`${__dirname}/${_query}`, 'utf-8');

  await storeData(host, port, db, key, query);

  const validKey = await checkQuery(key);
  const validQuery = await checkQuery(query);

  if (!validKey || !validQuery) {
    console.log('Some or both of the query are not valid');
    return;
  }

  console.log('\nResult:\n');
  console.log('- Both queries are valid')
  console.log(`- runAndCompareQuery: ${await runAndCompareQuery(key,query)}`);
  console.log(`- runAndCompareQueryPRO: ${await runAndCompareQueryPRO(key,query,1,1)}`);
}

run();

