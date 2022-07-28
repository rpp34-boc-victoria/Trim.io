const url = "http://localhost:8000";

export const apiGet = async (path:string, paramDic:any={}) => {
  const init = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  const params = objToQueryString(paramDic);
  const res = await fetch(`${url}${path}?${params}`, init);
  // await console.log(res);
  const body = await res.json();
  if (body.code === 200) {
    return body;
  } else {
    throw new Error(body.errmsg);
  }
};

export const apiPost = async (path:string, content:any={}) => {
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(content),
  };
  const res = await fetch(`${url}${path}`, init);
  const body = await res.json();
  if (body.code === 200) {
    return body;
  } else {
    throw new Error(body.errmsg);
  }
};

function objToQueryString(obj:any) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');
}