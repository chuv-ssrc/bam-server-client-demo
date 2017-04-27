/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Header from './Header';
import Footer from '../Footer/Footer';
import css from './Layout.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class Layout extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  // componentDidMount() {
  //   window.componentHandler.upgradeElement(this.root);
  // }
  //
  // componentWillUnmount() {
  //   window.componentHandler.downgradeElements(this.root);
  // }

  render() {
    return (
      <MuiThemeProvider>
      <div className={cx(css.root, "mdl-layout mdl-js-layout")} ref={node => (this.root = node)}>
        <div className="mdl-layout__inner-container">
          <Header />
          <main className="mdl-layout__content">
            <div {...this.props} className={cx(css.content, this.props.className)} />
            <Footer />
          </main>
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default Layout;
