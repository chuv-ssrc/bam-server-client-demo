import React from 'react';
import $ from 'jquery';


/**
 * @class IgvJs
 * @description The browser itself.
 */
class IgvJs extends React.Component {

  constructor() {
    super();
    this._createBrowser = this._createBrowser.bind(this);
    this._deleteBrowser = this._deleteBrowser.bind(this);
  }

  componentDidMount() {
    this._createBrowser(this.props.options);
  }

  componentWillUnmount() {
    this._deleteBrowser();
  }

  componentWillReceiveProps(newProps) {
    this._deleteBrowser();
    this._createBrowser(newProps.options);
  }

  _createBrowser(options) {
    if (options !== null) {
      let div = $("#igv-browser")[0];
      console.debug(options)
      window.igv.createBrowser(div, options);
    }
  }
  _deleteBrowser() {
    let div = $("#igv-browser")[0];
    window.igv.removeBrowser(div);
  }

  render() {
    return <div id='igv-browser'></div>;
  }

}


export default IgvJs;

