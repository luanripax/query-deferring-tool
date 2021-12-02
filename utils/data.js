const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const getAPIData = require('../utils/api');

const Data = [];

let storeData = async (host, port, db,key,query) => {

    await getAPIData(query,host, port, db).then((html) => {
  
      let dom = new JSDOM(html);
      let success = dom.window.document.querySelector("#success")
      let result = dom.window.document.querySelector("#result")
  
      if ( success && result ) {
        success = success.textContent;
        result = result.textContent;
        Data.push( { html:html, query:query, success:success, result: result} );
  
      } else
        throw Error('An error occurred at the HTTP request');
    });
  
    await getAPIData(key,host,port, db).then((html) => {
  
      let dom = new JSDOM(html);
      let success = dom.window.document.querySelector("#success")
      let result = dom.window.document.querySelector("#result")
  
      if ( success && result ) {
        success = success.textContent;
        result = result.textContent;
        Data.push( { html:html, query:key, success:success, result: result} );
  
      } else
        throw Error('An error occurred at the HTTP request');
    });
}

module.exports = {
    Data,
    storeData
};