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
    .then((response) => store.dispatch(feedback("SUCCESS", response)));
  }
  addUsers() {
    RestService.addUsers(["a@test.com"])
    .then((response) => store.dispatch(feedback("SUCCESS", response)));
  }
  removeUser() {
    RestService.removeUser("a@test.com")
    .then((response) => store.dispatch(feedback("SUCCESS", response)));
  }
  addSample() {
    RestService.addSample("testSample", "someFilePath");
  }
  removeSample() {
    RestService.removeSample("testSample", "someFilePath");
  }


  render() {
    return (
      <div className={css.usersPanel}>
        <div>
          <RaisedButton
            className={css.button}
            label="Register Auth0 app"
            primary
            onClick={this.addApp.bind(this)}
          />
        </div>
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
        {/*<div>*/}
          {/*<RaisedButton*/}
            {/*className={css.button}*/}
            {/*label="Add sample to bam-server"*/}
            {/*primary*/}
            {/*onClick={this.addSample.bind(this)}*/}
          {/*/>*/}
          {/*<RaisedButton*/}
            {/*className={css.button}*/}
            {/*label="Remove sample from bam-server"*/}
            {/*primary*/}
            {/*onClick={this.removeSample.bind(this)}*/}
          {/*/>*/}
        {/*</div>*/}
      </div>
    );
  }

}


export default UsersPanel;
