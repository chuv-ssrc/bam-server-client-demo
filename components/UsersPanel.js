import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import RestService from '../utils/RestService';
import css from './styles.css';


/**
 * To allow an admin to add/remove a user/sample/app to bam-server.
 */
class UsersPanel extends React.PureComponent {

  addUser() {
    RestService.addUser("test@test.com");
  }
  removeUser() {
    RestService.removeUser("test@test.com");
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
            label="Add user to bam-server"
            primary
            onClick={this.addUser.bind(this)}
          />
          <RaisedButton
            className={css.button}
            label="Remove user from bam-server"
            primary
            onClick={this.removeUser.bind(this)}
          />
        </div>
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
      </div>
    );
  }

}


export default UsersPanel;
