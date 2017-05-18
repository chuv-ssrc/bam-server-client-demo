import AuthService from './AuthService';
import store from '../src/store';
import { feedback } from '../actions/actionCreators';



class RestService {

  constructor() {
  }

  authHeader() {
    let headers = new Headers();
    let token = AuthService.getToken();
    if (token) {
      headers.append('Authorization', 'Bearer '+ AuthService.getToken());
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }

  handleErrors(response) {
    //console.debug("Response: ", response);
    if (!response.ok) {
      return response.text().then((errText) => {
        throw Error(response.statusText + (errText ? ": "+ errText : ""));
      });
    }
    return response;
  }

  ajax(method, path, data) {
    let url = window.CONFIG.backendUrl + path;
    console.info(url + (data ? " > "+ JSON.stringify(data) : ""));
    let options = {
      method: method,
      headers: this.authHeader(),
      body: data ? JSON.stringify(data) : undefined,
    };
    return fetch(url, options)
      .then(this.handleErrors)
      .then((response) => {
        console.debug(response)
        return response.text();
      })
      .catch((error) => {
        let message = error.message;
        if (message === "Failed to fetch") { message = "Could not connect to server"; }
        store.dispatch(feedback("ERROR", message));
        return Promise.reject();
      })
    ;
  }

  /**
   * Check that the user can access this resource (HEAD request).
   */
  checkBamUrl(path) {
    return this.ajax('GET', path);
  }

  addApp(iss, keyFile, description) {
    return this.ajax('PUT', 'apps', {iss, keyFile, description});
  }
  addUsers(usernames) {
    let users = usernames.map((name) => ({username: name, isActive: 1}));
    return this.ajax('PUT', 'users', {users: users});
  }
  removeUser(username) {
    return this.ajax('DELETE', 'users', {users: [username]});
  }
  addSample(sampleName, filename) {
    return this.ajax('PUT', 'samples', {samples: [{name: sampleName, filename: filename, isActive: 1}]});
  }
  removeSample(sampleName) {
    return this.ajax('DELETE', 'samples', {samples: [sampleName]});
  }
  addAccess(sampleName, username) {
    return this.ajax('PUT', 'users_samples', {users_samples: [{sample: sampleName, username: username}]});
  }
  removeAccess(sampleName, username) {
    return this.ajax('DELETE', 'users_samples', {users_samples: [{sample: sampleName, username: username}]});
  }

}


export default new RestService();
