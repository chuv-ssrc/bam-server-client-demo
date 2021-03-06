import React from 'react';
import store from '../src/store';
import RaisedButton from 'material-ui/RaisedButton';
import RestService from '../utils/RestService';
import css from './styles.css';
import { feedback } from '../actions/actionCreators';


/**
 * To allow an admin to add/remove a user/sample/app to bam-server.
 */
class UsersPanel extends React.PureComponent {

  addApp() {
    RestService.addApp("https://jdelafon.eu.auth0.com/", "/", "desc")
    .then((text) => { store.dispatch(feedback("SUCCESS", text)) });
  }
  addUsers() {
    RestService.addUsers(["a@test.com"])
    .then((text) => { store.dispatch(feedback("SUCCESS", text)) });
  }
  removeUser() {
    RestService.removeUser("a@test.com")
    .then((text) => { store.dispatch(feedback("SUCCESS", text)) });
  }
  addSample() {
    RestService.addSample("testSampleX", "/some/file/path")
    .then((text) => { store.dispatch(feedback("SUCCESS", text)) });
  }
  removeSample() {
    RestService.removeSample("testSampleX", "/some/file/path")
    .then((text) => { store.dispatch(feedback("SUCCESS", text)) });
  }
  addAccess() {
    RestService.addAccess("sample1", "a@test.com")
    .then((text) => { store.dispatch(feedback("SUCCESS", text)) });
  }
  removeAccess() {
    RestService.removeAccess("sample1", "a@test.com")
    .then((text) => { store.dispatch(feedback("SUCCESS", text)) });
  }

  render() {
    return (
      <div className={css.usersPanel}>

        {/*
        <div>
          <RaisedButton
            className={css.button}
            label="Register Auth0 app"
            primary
            onClick={this.addApp.bind(this)}
          />
        </div>
        */}

        <p style={{padding: '15px', paddingBottom: '0'}}>
        Log in as 'admin@test.com' (password: test).
        With the buttons below, add a user called 'a@test.com' to bam-server and give it access to 'sample1'.
        Then log out, log in as 'a@test.com' (password: test). You should be able to see 'sample1', but not 'sample2'.
        Initially, 'a@test.com' could see nothing. User 'admin@test.com' can see both.
        </p>

        <div>
          <RaisedButton
            className={css.button}
            label="Add user 'a@test.com' to bam-server"
            primary
            onClick={this.addUsers.bind(this)}
          />
          <RaisedButton
            className={css.button}
            label="Remove user 'a@test.com' from bam-server"
            primary
            onClick={this.removeUser.bind(this)}
          />
        </div>
        
        {/*
         <div>
          <RaisedButton
            className={css.button}
            label="Add sample to bam-server"
            primary
            onClick={this.addSample.bind(this)}
          />
          <RaisedButton
            className={css.button}
            label="Remove sample from bam-server"
            primary
            onClick={this.removeSample.bind(this)}
          />
        </div>
        */}

        <div>
          <RaisedButton
            className={css.button}
            label="Give a@test.com access to sample1"
            primary
            onClick={this.addAccess.bind(this)}
          />
          <RaisedButton
            className={css.button}
            label="Revoke access of a@test.com to sample1"
            primary
            onClick={this.removeAccess.bind(this)}
          />
        </div>
      </div>
    );
  }

}


export default UsersPanel;
