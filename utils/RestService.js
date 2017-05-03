import AuthService from './AuthService';



class RestService {

  constructor() {
    this.baseUrl = window.CONFIG.backendUrl;
  }

  authHeader() {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer '+ AuthService.getToken());
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  handleError(error) {
    console.debug("Error: "+ JSON.stringify(error, null, 2));
  }

  ajax(method, path, data) {
    let _this = this;
    let url = this.baseUrl + path;
    console.info(url +" > "+ JSON.stringify(data));
    let options = {
      method: method,
      headers: this.authHeader(),
      body: data ? JSON.stringify(data) : undefined,
    };
    fetch(url, options)
      .then((response) => {
        console.debug(response);
        return response.json();
      })
      //.then((responseData) => {...})
      .catch(function(error) {
        _this.handleError(error);
      })
    ;
  }

  /**
   * Check that the user can access this resource (HEAD request).
   */
  checkBamUrl(path) {
    return ajax('HEAD', path)
      .catch(function(error) {
        throw 'Could not connect: ' + JSON.stringify(error, null, 2);
      });
  }

  addUser(username) {
    return this.ajax('PUT', 'users', {users: [{username: username},]});
  }
  removeUser(username) {
    return this.ajax('DELETE', 'users', {users: [username]});
  }
  addSample(sampleName, filename) {
    return this.ajax('PUT', 'samples', {samples: [{name: sampleName, filename: filename}]});
  }
  removeSample(sampleName) {
    return this.ajax('DELETE', 'samples', {samples: [sampleName]});
  }

}


export default new RestService();
