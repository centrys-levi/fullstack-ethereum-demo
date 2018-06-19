
export const config = {
  apiUrl: 'http://localhost:8080/api',
};

export const postData = (resource, payload) => {
  return makeRequest(config.apiUrl + resource, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
};

export const putData = (resource, payload) => {
  return makeRequest(config.apiUrl + resource, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
};

export const getData = resource => {
  return makeRequest(config.apiUrl + resource);
};

const makeRequest = (url, extraParams) => {

  const options = {
    ...extraParams,
    headers: {
      ...(extraParams ? extraParams.headers : {}),
    }
  };

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        if (response.ok) {
          return response.json().catch(() => '');
        }
        reject(response);
      })
      .then(response => resolve(response))
      .catch((error) => {
        reject(error);
      })
  });
};
