const { Data } = require('../utils/data')

let checkQuery = async(query) => {
    var code = 0
    const data = Data.find(obj => obj.query === query);
      if (data.success === 'true') 
        code = 1
    return code;
}

let runAndCompareQueryPRO = async(key,query,chk_cols,chk_order) => {

    if ( !chk_cols && !chk_order )
      return runAndCompareQuery(key,query)

    const dataKey = Data.find(obj => obj.query === key);
    const dataQuery = Data.find(obj => obj.query === query);

    if (chk_order == 1) {
      let result = JSON.parse(dataKey.result);
      const keyResult = JSON.stringify(result._rows);
    
      result = JSON.parse(dataQuery.result);
      const queryResult = JSON.stringify(result._rows);
    
      if(keyResult != queryResult)
        return 0;
    }

    if (chk_cols) {
      let keySchema = JSON.parse(dataKey.result)._schema;
      let querySchema = JSON.parse(dataQuery.result)._schema;
      if(JSON.stringify(keySchema._names) != JSON.stringify(querySchema._names))
        return 0;
    }

    return 1;

}

let runAndCompareQuery = async(key,query) => {

  let code = 1

  const dataKey = Data.find(obj => obj.query === key);
  const dataQuery = Data.find(obj => obj.query === query);

  try {

    let resultKey = JSON.parse(dataKey.result);
    let resultQuery = JSON.parse(dataQuery.result);

    let answer = resultKey._rows;
    let check = resultQuery._rows;

    if (answer.length == check.length) {
      answer.forEach(ans => {
        if (!check.find(ch => JSON.stringify(ch) === JSON.stringify(ans)))
          code = 0
      });
    } else
        code = 0

  } catch {
    code = 2
  } 

  return code 
}

module.exports = {
    checkQuery,
    runAndCompareQuery,
    runAndCompareQueryPRO
};