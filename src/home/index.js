import React from 'react';
import Layout from '../../components/Layout/Layout';
import css from './styles.css';
import IgvJs from '../../components/IgvJs';

import RaisedButton from 'material-ui/RaisedButton';


class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      // Tracks options: https://github.com/igvteam/igv.js/wiki/Tracks

      options: {
        showNavigation: true,
        showRuler: true,
        genome: "hg19",
        tracks: [
          {
            name: "Genes",
            type: "annotation",
            format: "bed",
            sourceType: "file",
            url: "https://s3.amazonaws.com/igv.broadinstitute.org/annotations/hg19/genes/refGene.hg19.bed.gz",
            indexURL: "https://s3.amazonaws.com/igv.broadinstitute.org/annotations/hg19/genes/refGene.hg19.bed.gz.tbi",
            order: Number.MAX_VALUE,
            visibilityWindow: 300000000,
            displayMode: "COLLAPSED"
          },
        ]
      },

    }
  }

  viewPublicBam() {
    let options = this.state.options;
    options.locus = "chr8:128,748,000-128,754,000";  // Myc gene
    options.tracks.push({
      url: 'https://data.broadinstitute.org/igvdata/BodyMap/hg19/IlluminaHiSeq2000_BodySites/brain_merged/accepted_hits.bam',
      name: 'Brain (BodyMap)',
      displayMode: 'EXPANDED',  // 'EXPANDED', 'SQUISHED', 'COLLAPSED'
    });
    this.setState({ options });
  }

  viewPrivateBam() {
    let options = this.state.options;
    options.locus = "chr1:761997-762551";
    options.tracks.push({
      url: 'localhost:9000/bam/range/testkey',
      index: 'localhost:9000/bai/testkey',
      name: 'Protected resource!!',
      displayMode: 'SQUISHED',  // 'EXPANDED', 'SQUISHED', 'COLLAPSED'
    });
    this.setState({ options });
  }

  render() {
    return (
      <Layout className={css.content}>
        <div>

          <RaisedButton
            label="View public BAM" primary style={{margin: 12}}
            onClick={this.viewPublicBam.bind(this)}
          />
          <RaisedButton
            label="View private BAM" secondary style={{margin: 12}}
            onClick={this.viewPrivateBam.bind(this)}
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

export default HomePage;
