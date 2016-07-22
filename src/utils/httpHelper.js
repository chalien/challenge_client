var axios = require('axios');
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

axios.interceptors.response.use(
  function(response) {
    return new JSONAPIDeserializer({keyForAttribute: 'camelCase'})
    .deserialize(response.data)
    .then(function(result){
      response.data = result;
      return Promise.resolve(response);
    });
  }, function(error){
    return Promise.reject(error)
  }
);

const HttpHelper = {
  baseURL: "http://localhost:8080/",
  headers: {
    'Accept': 'application/json'
  },

  post(url, params){
    return this.request('post', url, { data: params });
  },

  put(url, params){
    return this.request('put', url, { data: params });
  },

  request(request_method, url, params) {
    var options = Object.assign({}, {
      method: request_method,
      url: url,
      baseURL: this.baseURL,
      headers: this.headers,
      responseType: 'json',
    }, params);
    return axios(options);
  }
}

export default HttpHelper;
