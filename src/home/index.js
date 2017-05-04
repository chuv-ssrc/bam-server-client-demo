import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import css from './styles.css';
import IgvJs from '../../components/IgvJs';
import AuthService from '../../utils/AuthService';
import RestService from '../../utils/RestService';
import Feedback from '../../utils/Feedback';
import RaisedButton from 'material-ui/RaisedButton';
import UsersPanel from '../../components/UsersPanel';


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
          {
            name: "Genes",
            type: "annotation",
            format: "bed",
            sourceType: "file",
            url: "https://s3.amazonaws.com/igv.broadinstitute.org/annotations/hg19/genes/refGene.hg19.bed.gz",
            indexURL: "https://s3.amazonaws.com/igv.broadinstitute.org/annotations/hg19/genes/refGene.hg19.bed.gz.tbi",
            order: Number.MIN_VALUE,
            visibilityWindow: 300000000,
            displayMode: "COLLAPSED"
          },
        ]
      },

    }
  }

  /**
   * If a token is still present in localStorage, check validity and use it to remain connected.
   */
  componentDidMount() {
    AuthService.tryLogin();
  }

  /**
   * Load a public bam file, available to everyone, by providing a direct url.
   */
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

  /**
   * Load a bam file using bam-server, sending the auth token in the URL.
   * Check that the resource is available to this user before loading.
   */
  viewPrivateBam() {
    RestService.checkBamUrl('bai/testkey').then(() => {
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

  /**
   * Clear the tracks.
   */
  reset() {
    let options = { ...this.state.options };
    options.tracks = [];
    this.setState({ options });
  }

  render() {
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
        <p><br/><br/></p>

        <UsersPanel />

        <Feedback />

      </Layout>
    );
  }

}


function mapStateToProps(state) {
  return {
    loggedIn: state.auth.loggedIn,
  };
}


export default connect(mapStateToProps)(HomePage);
