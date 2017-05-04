import AuthService from './AuthService';
import store from '../src/store';
import { feedback } from '../actions/actionCreators';



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

  handleErrors(response) {
    //console.debug("Response: ", response);
    if (!response.ok) {
      throw Error("HTTP Error "+ response.status + ": " + response.statusText);  // sends the response to the 'catch' block
    }
    return response;
  }

  ajax(method, path, data) {
    let url = this.baseUrl + path;
    console.info(url + (data ? " > "+ JSON.stringify(data) : ""));
    let options = {
      method: method,
      headers: this.authHeader(),
      body: data ? JSON.stringify(data) : undefined,
    };
    return fetch(url, options)
      .then(this.handleErrors)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        store.dispatch(feedback("ERROR", error.message));
        return Promise.reject();
      })
    ;
  }

  /**
   * Check that the user can access this resource (HEAD request).
   */
  checkBamUrl(path) {
    return this.ajax('HEAD', path);
  }

  addUsers(usernames) {
    let users = usernames.map((name) => ({username: name}));
    return this.ajax('PUT', 'users', {users: users});
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
