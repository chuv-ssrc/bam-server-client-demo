import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import css from './styles.css';
import IgvJs from '../../components/IgvJs';
import AuthService from '../../utils/AuthService';

import RaisedButton from 'material-ui/RaisedButton';


class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      options: {
        // Browser options: https://github.com/igvteam/igv.js/wiki/Browser
        showNavigation: true,
        showRuler: true,
        genome: "hg19",
        tracks: [
          // Tracks options: https://github.com/igvteam/igv.js/wiki/Tracks
          // {
          //   name: "Genes",
          //   type: "annotation",
          //   format: "bed",
          //   sourceType: "file",
          //   url: "https://s3.amazonaws.com/igv.broadinstitute.org/annotations/hg19/genes/refGene.hg19.bed.gz",
          //   indexURL: "https://s3.amazonaws.com/igv.broadinstitute.org/annotations/hg19/genes/refGene.hg19.bed.gz.tbi",
          //   order: Number.MAX_VALUE,
          //   visibilityWindow: 300000000,
          //   displayMode: "COLLAPSED"
          // },
        ]
      },

    }
  }

  componentDidMount() {
    AuthService.tryLogin();
  }

  viewPublicBam() {
    let options = { ...this.state.options };
    options.locus = "chr8:128,748,000-128,754,000";  // Myc gene
    options.tracks.push({
      url: 'https://data.broadinstitute.org/igvdata/BodyMap/hg19/IlluminaHiSeq2000_BodySites/brain_merged/accepted_hits.bam',
      name: 'Brain (BodyMap)',
      displayMode: 'SQUISHED',  // 'EXPANDED', 'SQUISHED', 'COLLAPSED'
    });
    this.setState({ options });
  }

  viewPrivateBam() {
    this.checkBamUrl().then((response) => {
      let options = { ...this.state.options };
      options.locus = "chr1:761997-762551";
      options.tracks.push({
        url: 'http://localhost:9000/bam/range/testkey?token='+ AuthService.getToken(),
        indexURL: 'http://localhost:9000/bai/testkey?token='+ AuthService.getToken(),
        type: "alignment",
        name: 'Protected resource!!',
        displayMode: 'SQUISHED',  // 'EXPANDED', 'SQUISHED', 'COLLAPSED'
      });
      this.setState({ options });
    });
  }

  checkBamUrl() {
    let url = 'http://localhost:9000/bam/range/testkey';
    let headers = new Headers();
    headers.append('Authorization', 'Bearer '+ AuthService.getToken());
    let options = {
      method: 'HEAD',
      headers: headers,
    };
    return fetch(url, options).then((response) => {
      console.log('Authorized:', response);
    }).catch(function(error) {
      throw 'Could not connect: ' + JSON.stringify(error, null, 2);
    });
  }

  reset() {
    let options = { ...this.state.options };
    options.tracks = [];
    this.setState({ options });
  }

  render() {
    console.debug(this.state.options.tracks.length)
    return (
      <Layout className={css.content}>
        <div>

          { !this.props.loggedIn ?
              <RaisedButton
                className={css.button}
                label="Log in"
                onClick={AuthService.showLogin}
              />
            :
              <RaisedButton
                className= {css.button}
                label="Log out"
                onClick={AuthService.logout}
              />
          }

          <RaisedButton
            className={css.button}
            label="View public BAM"
            primary
            onClick={this.viewPublicBam.bind(this)}
            disabled={!this.props.loggedIn}
          />
          <RaisedButton
            className={css.button}
            label="View private BAM"
            secondary
            onClick={this.viewPrivateBam.bind(this)}
            disabled={!this.props.loggedIn}
          />
          <RaisedButton
            className={css.button}
            label="Clear"
            primary
            onClick={this.reset.bind(this)}
            disabled={!this.props.loggedIn}
          />

          <IgvJs options={this.state.options} />

        </div>
        <p>
          <br /><br />
        </p>
      </Layout>
    );
  }

}


function mapStateToProps(state, ownProps) {
  return {
    loggedIn: state.auth.loggedIn,
  };
}


export default connect(mapStateToProps)(HomePage);
