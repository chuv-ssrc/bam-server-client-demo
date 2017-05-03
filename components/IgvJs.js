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

  _copyOptions(options) {
    let optionsCopy = {...options};
    let tracks = [...options.tracks];
    optionsCopy.tracks = tracks;
    return optionsCopy;
  }

  // Mutates options.tracks, so must deep copy the options props
  _createBrowser(options) {
    if (options !== null) {
      let div = $("#igv-browser")[0];
      window.igv.createBrowser(div, this._copyOptions(options));
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

