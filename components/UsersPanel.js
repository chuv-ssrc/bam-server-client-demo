import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import RestService from '../utils/RestService';
import css from './styles.css';


/**
 * To allow an admin to add/remove a user/sample/app to bam-server.
 */
class UsersPanel extends React.PureComponent {

  addApp() {
    RestService.addApp("https://jdelafon.eu.auth0.com/", "/", "desc");
  }
  removeApp() {
    RestService.removeApp("https://jdelafon.eu.auth0.com/");
  }
  addUsers() {
    RestService.addUsers(["A@test.com", "B@test.com"]);
  }
  removeUser() {
    RestService.removeUser("B@test.com");
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
          <RaisedButton
            className={css.button}
            label="Remove Auth0 app"
            primary
            onClick={this.removeApp.bind(this)}
          />
        </div>
        <div>
          <RaisedButton
            className={css.button}
            label="Add users A,B to bam-server"
            primary
            onClick={this.addUsers.bind(this)}
          />
          <RaisedButton
            className={css.button}
            label="Remove user B from bam-server"
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
