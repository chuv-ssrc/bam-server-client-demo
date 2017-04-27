import React from 'react';
import Layout from '../../components/Layout/Layout';
import css from './styles.css';
import IgvJs from '../../components/IgvJs';

import RaisedButton from 'material-ui/RaisedButton';


class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      options: {
        showNavigation: true,
        showRuler: true,
        genome: "hg19",
        locus: "chr8:128,748,000-128,754,000",
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
            displayMode: "EXPANDED"
          },
        ]
      },

    }
  }

  viewBam() {
    let options = this.state.options;
    options.tracks.push({
      url: 'https://data.broadinstitute.org/igvdata/BodyMap/hg19/IlluminaHiSeq2000_BodySites/brain_merged/accepted_hits.bam',
      name: 'Brain (BodyMap)'
    });
    this.setState({ options });
  }

  render() {
    return (
      <Layout className={css.content}>
        <div>

          <RaisedButton label="View BAM" primary={true} style={{margin: 12}}
            onClick={this.viewBam.bind(this)}
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
