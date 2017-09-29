function constructRequest(har) {
  const harRequest = har.entries[0].request[0];
  const requestObj = {
    method: harRequest.method,
    body: harRequest.postData.text,
  };

  if (harRequest.headers.length) {
    requestObj.headers = {};
    harRequest.headers.forEach(header => {
      requestObj.headers[header.name] = header.value;
    });
  }

  if (harRequest.queryString.length) {
    harRequest.url = `${harRequest.url}?`;
    let query;
    harRequest.queryString.forEach((ele, i) => {
      query = `${harRequest.queryString[i].name}=${harRequest.queryString[i].value}`;
    });
    harRequest.url = harRequest.url.concat(query);
  }
  return new Request(harRequest.url, requestObj);
}

function fetchRequest(har) {
  return fetch(constructRequest(har));
}

module.exports = fetchRequest;
module.exports.constructRequest = constructRequest;
