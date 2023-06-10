export default (baseUrl, headers) => {
  return (url, ...otherParams) => {
    if (headers && Object.values(headers).length) {
      if (!otherParams[0]) {
        otherParams[0] = {};
      }
      if (!otherParams[0].headers){
        otherParams[0].headers = {};
      }
      otherParams[0].headers = {
        ...headers,
        ...otherParams[0].headers
      }
    }
    let requestUrl = baseUrl;
    if (url.startsWith('/')) {
      requestUrl = baseUrl + url;
    }
    return fetch(requestUrl, ...otherParams);
  };
};
